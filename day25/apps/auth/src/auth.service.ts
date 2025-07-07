import {
  User,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/common';
import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserToken } from './Entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: UserServiceClient;

constructor(
  private jwtService: JwtService,
  @Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc,
  @InjectRepository(UserToken)
  private readonly tokenRepo: Repository<UserToken>,
  private readonly eventEmitter: EventEmitter2  // or Kafka client if using Kafka
) {}


  onModuleInit() {
    this.authService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  // async login(loginDto: LoginDto) {
  //   const { user } = (await firstValueFrom(
  //     this.authService.findUserByEmail({ email: loginDto.email }),
  //   )) as { user: User | null };
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   console.log('User found:', user);
  //   const isPasswordValid = await bcrypt.compare(
  //     loginDto.password,
  //     user.password,
  //   );
  //   if (!isPasswordValid) {
  //     throw new NotFoundException('Invalid password');
  //   }
  //   const token = this.generateToken(user);
  //   console.log('Generated token:', token);
  //   const { password, ...result } = user;

  //   return {
  //     message: 'Login successful',
  //     accessToken: token.accessToken,
  //   };
  // }


  async login(loginDto: LoginDto) {
  const { user } = await firstValueFrom(this.authService.findUserByEmail({ email: loginDto.email })) as { user: User | null };

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
  if (!isPasswordValid) {
    throw new NotFoundException('Invalid password');
  }

  const tokenObj = this.generateToken(user);
  const accessToken = tokenObj.accessToken;

  // Save token to DB
  const userToken = this.tokenRepo.create({
    token: accessToken,
    userId: user.id,
    isActive: true,
  });
  await this.tokenRepo.save(userToken);

  // Emit Event: user.logged_in
  this.eventEmitter.emit('user.logged_in', {
    userId: user.id,
    email: user.email,
    role: user.role,
    token: accessToken,
  });

  return {
    message: 'Login successful',
    accessToken,
  };
}


  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: 'mySecretKey' });
      return {
        userId: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        isValid: true,
      };
    } catch (e) {
      return {
        userId: null,
        role: null,
        isValid: false,
      };
    }
  }

  private generateToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        { sub: user.id, email: user.email, role: user.role.toLowerCase() },
        { secret: 'mySecretKey', expiresIn: '1h' },
      ),
    };
  }

  async findUserById(id: number) {
    const user = (await firstValueFrom(
      this.authService.findUserById({ id }),
    )) as User | null;
    return user;
  }
}

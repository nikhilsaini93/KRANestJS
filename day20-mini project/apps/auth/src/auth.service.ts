import { Injectable, Inject, OnModuleInit, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { UserServiceClient, USER_SERVICE_NAME, User } from '@app/common/types/user'; // adjust import as per your proto

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    private jwtService: JwtService,
    @Inject('user_service') private readonly client: ClientGrpc,
  ) {
      bcrypt.hash('admin123', 10).then(console.log);
  }

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async login(loginDto: LoginDto) {
    // Call user microservice to get user by email
    const { user } = await firstValueFrom(this.userService.findUserByEmail({ email: loginDto.email })) as { user: User | null };
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }
  
    const token = this.generateToken(user);

    // Remove password from response
    const { password, ...result } = user;

    return {
      message: 'Login successful',
      user: result,
      ...token,
    };
  }

  async validateToken(token: string) {
  try {
    const payload = this.jwtService.verify(token, { secret: 'mySecretKey' });
    return {
      userId: payload.sub,
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
        { sub: user.id, email: user.email, role: user.role },
        { secret: 'mySecretKey', expiresIn: '1h' }
      ),
    };
  }
  //  async findUserById(id: number) {
  //   return await this.userService.findOne({ where: { id } });
  // }
  async findUserById(id: number) {
  // gRPC expects an object with an id property
  const user = await firstValueFrom(this.userService.findUserById({ id })) as User | null;
  return user;
}
}
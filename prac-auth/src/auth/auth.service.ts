import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
   
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email : email},
    // Select only the necessary fields


  
    });
    // //(user);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        `Invalid password for user with email ${email}`,
      );
    }
    const payload = { email: user.email, sub: user.userId };

    const token = await this.jwtService.signAsync(payload)

    return {
        message: "Login successful",
        access_token: token,
    }
  }

  private async hashPassword() {
    const hashed = await bcrypt.hash('admin123', 10);
    //(hashed);
  }

  async findUserById(id: number) {
    return await this.usersRepository.findOne({ where: { userId: id } });
  }

}

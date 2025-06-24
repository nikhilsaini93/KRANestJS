import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTHENTICATION_SERVICE_NAME, AuthenticationServiceClient } from '@app/common/types/auth';

import { firstValueFrom } from 'rxjs';


@Injectable()
export class AuthApiService implements OnModuleInit {
  private authService: AuthenticationServiceClient;

  constructor(@Inject('AUTHH_API_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthenticationServiceClient>(AUTHENTICATION_SERVICE_NAME);
  }

  async login(loginDto: LoginDto) {
    // Call the gRPC Auth microservice's login method
    return await firstValueFrom(this.authService.login(loginDto));
  }

  async validateToken(token: string) {
    return await firstValueFrom(this.authService.validateToken({ token }));
  }
}



















import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @MaxLength(50, { message: 'password must be at most 50 characters long' })
  password: string;
}

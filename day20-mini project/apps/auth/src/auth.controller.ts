import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationServiceControllerMethods } from '@app/common/types/auth';
import { LoginDto } from './DTO/login.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('auth')
@AuthenticationServiceControllerMethods()
export class AuthController {
  constructor(private readonly authsvc: AuthService) {}

  async login(loginDto: LoginDto) {
    return await this.authsvc.login(loginDto);
  }
    @GrpcMethod('AuthenticationService', 'ValidateToken')
  async validateToken(data: { token: string }) {
    // implement your token validation logic here
    // for example:
    return this.authsvc.validateToken(data.token);
  }

}

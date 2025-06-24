import { Body, Controller, Post } from '@nestjs/common';
import { AuthApiService, LoginDto } from './auth-api.service';


@Controller('auth')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authApiService.login(loginDto);
  }

  @Post('validate-token')
  async validateToken(@Body('token') token: string) {
    return this.authApiService.validateToken(token);
  }
}
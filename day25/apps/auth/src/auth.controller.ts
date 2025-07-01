import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/login.dto';
import { AuthenticationServiceControllerMethods } from '@app/common';

@Controller()
@AuthenticationServiceControllerMethods()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  async login(loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  async validateToken(data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
}

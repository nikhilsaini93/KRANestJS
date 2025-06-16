import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authsvc: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authsvc.login(loginDto);
  }

  @Get('audit-logs')
  async getAllAuditLogs() {
    return await this.authsvc.getAllAuditLogs();
  }

  @Get('audit-logs/:id')
  async getAuditLogById(@Param('id') id: number) {
    return await this.authsvc.findAuditLogById(+id);
  }

  @Get('audit-logs/:id/user')
  async getAuditLogsOfUser(@Param('id') id: number) {
    return await this.authsvc.getAllAuditLogsOfUser(+id);
  }
}

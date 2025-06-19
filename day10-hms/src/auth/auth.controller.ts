import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/login.dto';
import { jwtAuthGuards } from './guards/auth.guards';
import { RolesGuard } from './guards/role.guards';
import { Roles } from './Decorators/roles.decorators';
import { Role } from 'src/user-accounts/enitity/user-account.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authsvc: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authsvc.login(loginDto);
  }

  @Get('audit-logs')
  @UseGuards(jwtAuthGuards , RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAllAuditLogs() {
    return await this.authsvc.getAllAuditLogs();
  }

  @Get('audit-logs/:id')
  @UseGuards(jwtAuthGuards , RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAuditLogById(@Param('id') id: number) {
    return await this.authsvc.findAuditLogById(+id);
  }

  @Get('audit-logs/:id/user')
  @UseGuards(jwtAuthGuards , RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAuditLogsOfUser(@Param('id') id: number) {
    return await this.authsvc.getAllAuditLogsOfUser(+id);
  }
}

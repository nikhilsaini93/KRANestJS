import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/login.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

     @Post('login')
  @ApiOperation({ summary: 'Login for customers or businesses' })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns access token and user data.',
  })
  @ApiBadRequestResponse({ description: 'Invalid login credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

    // @Post('loginforbussiness')
    // async loginforBussiness(@Body() loginDto: LoginDto){
    //     return this.authService.loginforBussiness(loginDto)
    
    // }



}
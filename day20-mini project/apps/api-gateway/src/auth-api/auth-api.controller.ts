import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthApiService, LoginDto } from './auth-api.service';
import { ClientKafka } from '@nestjs/microservices';


@Controller('auth')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService , @Inject('KAFKA_SERVICE') private readonly kafkaClient : ClientKafka) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
     const app = await this.authApiService.login(loginDto);
              await this.kafkaClient.emit('login',loginDto);
     return { message: 'Login successful' ,app };

  }

  @Post('validate-token')
  async validateToken(@Body('token') token: string) {
    this.kafkaClient.emit('validate_token',token);
    return this.authApiService.validateToken(token);
  }
}
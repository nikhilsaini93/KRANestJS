import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { userDto } from './DTO/userDto';

@Controller("user")
export class AppController {
  constructor(private readonly appService: AppService,
  
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  creatUser(@Body(new ValidationPipe)  userDto: userDto) {
   this.appService.validateAge(userDto.age)
     this.appService.validateDateOfBirth(userDto.myDate.toString())
   
    return {
      message: 'User successfully created',
      data: userDto,
    };
  }
}

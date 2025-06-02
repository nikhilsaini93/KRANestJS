// import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// import { UserService } from './user.service';

// import { UserDto } from './user.dto';
// import { AuthGuard } from 'src/auth/auth.guard';
// import { currentUserId } from 'src/auth/user.decorator';

// @Controller('user')
// export class UserController {
//     constructor(private readonly userService: UserService) {}


//     @Post('signup')
//     signup(@Body() dto : UserDto){
//         const user = this.userService.signup(dto.username, dto.password);
//         if (!user) throw new BadRequestException('User already exists');

//         return{
//             message: 'User created successfully',
//            userId: user.id 
//         }

//     }


//     @Post('login')
//     login(@Body() dto : UserDto){
//         const user = this.userService.login(dto.username, dto.password);
//         if (!user) throw new BadRequestException('Invalid credentials');
//         console.log('✅ User logged in:', user);
//     return { token: `Bearer ${user.id} with ${user.username} password - ${user.password}` };  
//     }


//     @UseGuards(AuthGuard)
//      @Get('me')
//   getProfile(@currentUserId() userId: number) {
//     console.log('🔐 Accessed profile of user ID:', userId);
//     return { userId };
//   }
// }



// use db 


// /use db 
// src/user/user.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  UseGuards,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { currentUserId } from 'src/auth/user.decorator';

import { LogInterceptor } from 'src/auth/logg.interceptor';

@Controller('user')
@UseInterceptors(LogInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() dto: LoginDto) {
    const user = await this.userService.signup(dto.username, dto.password);
    if (!user) throw new BadRequestException('User already exists');
    return { message: 'User signed up successfully', userId: user.id };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.userService.validateUser(dto.username, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    console.log('✅ User logged in:', user);
    return { token: `Bearer ${user.id}` };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@currentUserId() userId: number) {
    console.log('🔐 Accessed profile of user ID:', userId);
    return await this.userService.findById(userId);
  }
}
   
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Auth1Service } from './auth1.service';
import { RegisterDto } from './DTO/register.dto';
import { LoginDto } from './DTO/login.dto';
import { jwtAuthGuards } from './guards/authGuards';
import { currentUser } from './decorators/currentuser.decorators';
import { User } from 'src/user/user.entity';
import { UserRole } from './entities/user.entity';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guards/rolse.guards';

@Controller('auth1')
export class Auth1Controller {
    constructor(private readonly auth1Service: Auth1Service) {}


    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.auth1Service.register(registerDto);
    }

    
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.auth1Service.login(loginDto);
    }

    // @Post("refresh-token")
    // refreshToken(@Body() body: { token: string }) {
    //     return this.auth1Service.refreshToken(body.token);
    // }
    @UseGuards(jwtAuthGuards)
    @Get('profile')
    getProfile(@currentUser() user: any) {
        return user
    }  
    
    
@Post('create-admin')
@Roles(UserRole.ADMIN)
@UseGuards(jwtAuthGuards , RolesGuard)
    createAdmin(@Body() registerDto: RegisterDto) {
        return this.auth1Service.createAdmin(registerDto);
    }




    
}

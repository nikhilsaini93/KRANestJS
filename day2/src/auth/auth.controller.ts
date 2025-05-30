import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/register.dto';
import { LoginDto } from './DTO/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    @Post("register")
    register(@Body() body : RegisterDto){
        return this.authService.register(body.username, body.password);


    }

    @Post("login")
    login(@Body() body : LoginDto){
        const User = this.authService.validateUser(body.username, body.password);
        return this.authService.login(User);
    }

    @Post("mylogin")
    loginn(@Body() body : {username : string , password : string}){
        return this.authService.authenticate(body)

    }
}

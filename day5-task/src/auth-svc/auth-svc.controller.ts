import { Body, Controller, Post } from '@nestjs/common';
// import { LoginDto } from './DTO/login.dto';
import { AuthSvcService } from './auth-svc.service';
import { User } from 'src/user-mng/enitiies/user.entity';
import { LoginDto } from './DTO/login.dto';

@Controller('auth-svc')
export class AuthSvcController {
constructor(private readonly authSvcService: AuthSvcService) {}
    @Post('login')
    login(@Body() loginDto : LoginDto) {
        return this.authSvcService.login(loginDto);
    }
}

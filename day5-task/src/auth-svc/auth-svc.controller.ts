import { Body, Controller, Post, UseGuards } from '@nestjs/common';
// import { LoginDto } from './DTO/login.dto';
import { AuthSvcService } from './auth-svc.service';
import { User } from 'src/user-mng/enitiies/user.entity';
import { LoginDto } from './DTO/login.dto';
import { loginThrottlerGuard } from './guards/loggingThrotllerGuard';

@Controller('auth-svc')
export class AuthSvcController {
constructor(private readonly authSvcService: AuthSvcService) {}
    @UseGuards(loginThrottlerGuard)
    @Post('login')
    login(@Body() loginDto : LoginDto) {
        return this.authSvcService.login(loginDto);
    }
}

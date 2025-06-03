import { Module } from '@nestjs/common';
import { AuthSvcController } from './auth-svc.controller';
import { AuthSvcService } from './auth-svc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user-mng/enitiies/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guards/roles.guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({})
     

  ],
  controllers: [AuthSvcController],
  providers: [AuthSvcService , JwtStrategy , RolesGuard],
  exports: [AuthSvcService, JwtModule, PassportModule]
})
export class AuthSvcModule {}

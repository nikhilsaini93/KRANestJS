import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule.register({
    global: true,
    secret : "mySecretKey",
    signOptions: { expiresIn: '1h' }, 
  })],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
  exports : [AuthService , ]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret : "mySecretKey",
    signOptions: { expiresIn: '1h' }, 
  })

],
  controllers: [AuthController],
  providers: [AuthService  , JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Customer } from 'src/customers/entities/customer.entity';
import { Business } from 'src/bussiness/entities/bussiness.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer , Business]),JwtModule.register({
    global: true,
    secret : "mySecretKey",
    signOptions: { expiresIn: '1h' }, 
  })],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
  exports : [AuthService  ]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { Auth1Controller } from './auth1.controller';
import { Auth1Service } from './auth1.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import passport from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guards/rolse.guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({})

  ],
  controllers: [Auth1Controller],
  providers: [Auth1Service  , JwtStrategy , RolesGuard],
  exports: [Auth1Service, JwtModule, PassportModule]
})
export class Auth1Module {}

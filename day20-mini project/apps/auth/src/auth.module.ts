import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME } from '@app/common/types/user';
import { join } from 'path';
@Module({
  imports: [JwtModule.register({
    secret: 'mySecretKey', 
      signOptions: { expiresIn: '1h' }, 
  }), PassportModule,
  ClientsModule.register([
      {
        name : "user_service",
        transport : Transport.GRPC,
        options :{
          package :USER_PACKAGE_NAME,
          protoPath :  join(__dirname , "../user.proto"),
          url : "0.0.0.0:5002"
        }
      }
    ])
],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { join } from 'path';

import { AUTH_PACKAGE_NAME, DatabaseModule, USER_PACKAGE_NAME, USER_SERVICE_NAME} from '@app/common';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from './Entity/auth.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [JwtModule.register({
    secret: 'mySecretKey', 
      signOptions: { expiresIn: '1h' }, 
  }), EventEmitterModule.forRoot(), PassportModule, DatabaseModule,
  TypeOrmModule.forFeature([UserToken]),
  ClientsModule.register([
      {
        name : USER_SERVICE_NAME,
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

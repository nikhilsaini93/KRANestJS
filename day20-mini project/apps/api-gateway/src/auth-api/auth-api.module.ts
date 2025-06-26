import { Module } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { AuthApiController } from './auth-api.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common/types/auth';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
    ClientsModule.register([{
    name : "AUTHH_API_SERVICE",
    transport : Transport.GRPC,
    options :{
      protoPath : join(__dirname, "../auth.proto"),
            package : AUTH_PACKAGE_NAME,
            url: "0.0.0.0:5003"
  }
}])
,
ClientsModule.register([{
    name: "KAFKA_SERVICE",
    transport: Transport.KAFKA,
    options: {
      client:{
        brokers : ['localhost:9092'],
      },
    }
  }])
],
  controllers: [AuthApiController],
  providers: [AuthApiService ,JwtStrategy ],
})
export class AuthApiModule {}

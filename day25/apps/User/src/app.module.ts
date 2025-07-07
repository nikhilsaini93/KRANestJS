import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AUTH_PACKAGE_NAME,
  AUTHENTICATION_SERVICE_NAME,
  DatabaseModule,
  Userr,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Userr]),
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: AUTHENTICATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto'),
          url: '0.0.0.0:5003',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

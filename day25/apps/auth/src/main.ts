import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule , {
    transport: Transport.GRPC,
    options: {
      protoPath : join(__dirname, "../auth.proto"),
      package : AUTH_PACKAGE_NAME,
      url: "0.0.0.0:5003"
    }
  })

  await app.listen();

  console.log("Auth is running and listening on port 5003")
}
bootstrap();

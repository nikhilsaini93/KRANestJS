import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@app/common/types/user';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule ,{
    transport: Transport.GRPC,
    options:{
      protoPath : join(__dirname, "../user.proto"),
      package : 'user',
      url: "0.0.0.0:5002"
    }
  }
  );
  await app.listen();
  console.log("User Service run on url -> 5002")
}
bootstrap()




import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: "../proto/users.proto",
      url: '0.0.0.0:5001',
    },

  });
  await app.listen();
  console.log('user Service is running on grpc ');

}
bootstrap();

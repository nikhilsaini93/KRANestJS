import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: "../proto/product.proto",
      url: '0.0.0.0:3001',
    },
  
 
  });
  await app.listen();
  Logger.log('Product service is running on grpc');

}
bootstrap(); 
        
import { NestFactory } from '@nestjs/core';
import { OrderSvcModule } from './order-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderSvcModule , {
    transport : Transport.KAFKA,
    options : {
      client : {
        brokers : ['localhost:9092'],
      },
      consumer : {
        groupId : 'order-consumer'
      }
    }
  });
  await app.listen();
  Logger.log(
    "Application is running on kafka port"
  )
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { PaymentSvcModule } from './payment-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentSvcModule ,
    {
        transport : Transport.KAFKA,
        options : {
          client : {
            brokers : ['localhost:9092'],
          },
          consumer : {
            groupId : 'payment-consumer'
          }
        }
      }
  );
  await app.listen();
  Logger.log(
    "Payment Microservice is running on kafka port"
  )
}
bootstrap();

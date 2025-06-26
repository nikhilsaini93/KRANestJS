import { NestFactory } from '@nestjs/core';
import { NotificationSvcModule } from './notification-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationSvcModule ,{
      transport : Transport.KAFKA,
      options : {
        client : {
          brokers : ['localhost:9092'],
        },
        consumer : {
          groupId : 'Notification-consumer'
        }
      }
    })
  await app.listen();

  Logger.log(
    "Notification Microservice is running on kafka port"
  )
}
bootstrap();

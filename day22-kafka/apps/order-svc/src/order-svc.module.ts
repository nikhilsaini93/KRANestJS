import { Module } from '@nestjs/common';
import { OrderSvcController } from './order-svc.controller';
import { OrderSvcService } from './order-svc.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
imports: [ClientsModule.register([{
    name: "KAFKA_SERVICE",
    transport: Transport.KAFKA,
    options: {
      client:{
        brokers : ['localhost:9092'],
      },
    }

  }])],
  controllers: [OrderSvcController],
  providers: [OrderSvcService],
})
export class OrderSvcModule {}

import { Module } from '@nestjs/common';
import { PaymentSvcController } from './payment-svc.controller';
import { PaymentSvcService } from './payment-svc.service';
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
  controllers: [PaymentSvcController],
  providers: [PaymentSvcService],
})
export class PaymentSvcModule {}

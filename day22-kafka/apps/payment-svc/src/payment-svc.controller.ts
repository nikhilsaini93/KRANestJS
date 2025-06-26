import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentSvcService } from './payment-svc.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentSvcController {
  constructor(private readonly paymentSvcService: PaymentSvcService , 
    @Inject('KAFKA_SERVICE') private readonly kafkaClient : ClientKafka
  ) {}

  @Get()
  getHello(): string {
    return this.paymentSvcService.getHello();
  }

  @MessagePattern("process-payment")
  processPayment(@Payload() data : any){
    console.log("[Payment Service] ->  Payment in process " , data)

    this.kafkaClient.emit("payment-Succed" , data)

}
}

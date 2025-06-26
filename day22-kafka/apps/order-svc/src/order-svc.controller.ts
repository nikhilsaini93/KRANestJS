import { Controller, Get, Inject } from '@nestjs/common';
import { OrderSvcService } from './order-svc.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderSvcController {
  constructor(private readonly orderSvcService: OrderSvcService , 
    @Inject('KAFKA_SERVICE') private readonly kafkaClient : ClientKafka
  ) {}

  @Get()
  getHello(): string {
    return this.orderSvcService.getHello();
  }

  @MessagePattern("order_created")
  handleOrderCreated(@Payload() data : any){
    console.log('[order-Created]: Recieve new Order :' , data );
  

 this.kafkaClient.emit("process-payment" , data)
}

}
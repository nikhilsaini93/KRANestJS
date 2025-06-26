import { Controller, Get } from '@nestjs/common';
import { NotificationSvcService } from './notification-svc.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationSvcController {
  constructor(private readonly notificationSvcService: NotificationSvcService) {}

  @Get()
  getHello(): string {
    return this.notificationSvcService.getHello();
  }


  @MessagePattern("payment-Succed")
  handlePaymentSucced(@Payload() data : any){
    console.log("[Notification Recived in Notification service] Payement Succesd" , data)
}

  @MessagePattern("order_created")
  OrderPlaced(@Payload() data : any){
    console.log("[Notification Recived in Notification service] order created email sending....." , data)
}
}

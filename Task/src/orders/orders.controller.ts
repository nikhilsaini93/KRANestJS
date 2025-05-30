import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './DTO/order.dto';
interface validate {
     orderId : string , 
     userId : string,
     amount : number
}

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService  : OrdersService) {}

    @Post()
    async createOrder(@Body(new ValidationPipe()) orderDto: OrderDto)  {
       const  orderDataa =  this.orderService.createOrder(orderDto);
       return orderDataa
    }

}
  
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderDto } from './order.dto';

@Controller("orders")
export class AppController {
  constructor(private readonly appService: AppService) {}

 
  @Post()
  async create(@Body() order: OrderDto) {
    console.log('Received order:', order);
    const response = await this.appService.createOrder(order);
    console.log('Response from payment service:', response);
    return response;
  }
}

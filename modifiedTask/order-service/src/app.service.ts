import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDto } from './order.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('PAYMENT_SERVICE') private client: ClientProxy) {}

  async createOrder(order: OrderDto) {
    console.log('Sending order to payment service...');
    const response = await firstValueFrom(
      this.client.send('processorder', order),
    );
    console.log('Received payment response:', response);
    return response;
  }
}

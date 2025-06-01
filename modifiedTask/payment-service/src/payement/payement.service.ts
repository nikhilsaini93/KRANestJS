import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/order.dto';

@Injectable()
export class PayementService {
  async processPayment(order: OrderDto) {
    console.log(`Processing payment for order ${order.orderId}`);
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      order: order,
      status: 'success',
      message: `Payment for order ${order.orderId} processed successfully`,
      transactionId: Date.now().toString(), // Fixed typo + toString
    };
  }
}

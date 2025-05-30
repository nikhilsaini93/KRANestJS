import { Injectable } from '@nestjs/common';
import { OrderDto } from './DTO/order.dto';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrdersService {
 
    constructor(private readonly paymentService: PaymentService) {}


    // getrequest()
    async createOrder(orderDto: OrderDto)
    {
        const paymentResponse = await this.paymentService.procesPayment(orderDto);
        console.log(paymentResponse);
        return {
            order: orderDto,
            paymentResponse: paymentResponse,
           
        };

    }

    // sendorder(id: string): OrderDto | string {
    //     const order = this.order.find(order => order.orderId === id);
    //     if (!order) {
    //         return 'Order not found';
    //     }
    //     return order;
    // }


    }

import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/orders/DTO/order.dto';

@Injectable()
export class PaymentService {
    async procesPayment(orderDto : OrderDto){
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve('Payment processed successfully');
            }, 0);
        });
        const transactionId = Date.now().toString();
        return {
            status : "success",
            message : "Payment processed successfully",
            transactionId : transactionId,
        }
    }
}

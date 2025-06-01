import { Controller } from '@nestjs/common';
import { PayementService } from './payement.service';
import { MessagePattern } from '@nestjs/microservices';
import { OrderDto } from 'src/order.dto';

@Controller('payement')
export class PayementController {

    constructor (private readonly payementService: PayementService) {}

    @MessagePattern('processorder')
    handleProcessOrder(order: OrderDto){
        return this.payementService.processPayment(order);
    } 
}

import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService){}





    @Get()
    async findAllPayment(){
        return await this.paymentService.findAllPayment();
    }
}

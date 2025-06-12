import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './DTO/payment.dto';

@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService){}





    @Get()
    async findAllPayment(){
        return await this.paymentService.findAllPayment();
    }

    @Get(':id')
    async findById(@Param('id') id: number){
        return await this.paymentService.findById(+id)      

    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createpayment(@Body() createPayment: CreatePaymentDto){
        return await this.paymentService.createPayment(createPayment)
    }

    @Patch(':id/status')
    async statuschange(@Param('id') id: number){
        return await this.paymentService.statuschange(+id)
    }


}

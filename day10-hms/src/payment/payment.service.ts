import { Injectable } from '@nestjs/common';
import { Payment } from './enitity/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>){}

    async findAllPayment(){
        return await this.paymentRepository.find({
            relations: 
                ["BookingDetails"]
            
        });
       }

    



}

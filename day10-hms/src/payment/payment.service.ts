import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from './enitity/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './DTO/payment.dto';

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

    async createPayment(createPayment: CreatePaymentDto){
        const payment =  this.paymentRepository.create(createPayment)
        return await this.paymentRepository.save(payment)
        
    }
    
    
    async findById(id: number){
        const res = await this.paymentRepository.findOne({where : {id}})
        if(!res) { 
            throw new NotFoundException(`Payment with id ${id} not found`)
        }
        return res
    }

    async updatePaymentStatus(id : number , status: string) {
        const payment = await this.findById(id)
        payment.status = status
        return await this.paymentRepository.save(payment)
    }


    async checkPaymentStatus(id: number) {
        const payment = await this.findById(id);
        if (!payment) {
            throw new NotFoundException(`Payment with id ${id} not found`);
        }
        return payment.status;
    }

    



}

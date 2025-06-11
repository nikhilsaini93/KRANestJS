import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer_details.entitiy';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './DTO/customer.dto';

@Injectable()
export class CustomerDetailsService {
    constructor(@InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>){}


    async findall(){
        return await this.customerRepository.find();

    }

    
    async findById(customer_id: number){
        const res = await this.customerRepository.findOne({where : {customer_id}})
        if(!res) { 
            throw new NotFoundException(`Customer with id ${customer_id} not found`)
        }
        return res
    }

    async createCustomer(createCustomer : CreateCustomerDto){
        const newCustomer = this.customerRepository.create(createCustomer)
        return await this.customerRepository.save(newCustomer)
        

    }



    
}

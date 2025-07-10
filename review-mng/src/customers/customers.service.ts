import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) {}



  async create(createCustomerDto: CreateCustomerDto) {
    try {
       const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);
            if (!hashedPassword) {
              throw new ForbiddenException('Failed to hash password');
            }
          const newCustomer =  this.customerRepository.create({
              ...createCustomerDto,
              password: hashedPassword,
            });
            await this.customerRepository.save(newCustomer);
            return{
              success : true,
              messgae : "customer create"
            }

      
    } catch (error) {
      return {
        sucess : false,
        error : error.message
       }
      
    }
  }

  async findAll() {
   const res =  await this.customerRepository.find()
    return{
      success : true,
     data : res
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}

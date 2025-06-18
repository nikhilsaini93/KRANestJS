import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer_details.entitiy';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './DTO/customer.dto';
import { UpdateCustomerDto } from './DTO/updatecustomer.dto';

@Injectable()
export class CustomerDetailsService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findall() {
    try {
      return await this.customerRepository.find({
       relations:{
        bookings: {
          booking_details: {
            payment: true,
          },
          room_reservations: true,
           
        },
        },
      });
    } catch (error) {
      throw new NotFoundException('No customers found');
    }
  }

  async findById(customer_id: number) {
    const res = await this.customerRepository.findOne({
      where: { customer_id },
      relations:{
        bookings: {
          booking_details: {
            payment: true,
          },
          room_reservations: true,
           
        },
      }
    });
    if (!res) {
      throw new NotFoundException(`Customer with id ${customer_id} not found`);
    }
    return res;
  }

   async createCustomer(createCustomer: CreateCustomerDto) {
        try {
            // Check if email already exists
            const existingCustomer = await this.customerRepository.findOne({
                where: { email: createCustomer.email }
            });

            if (existingCustomer) {
                throw new ConflictException('Customer with this email already exists');
            }

            // Validate phone number format
            if (!/^\d{10}$/.test(createCustomer.phone)) {
                throw new BadRequestException('Phone number must be 10 digits');
            }

        

            const newCustomer = this.customerRepository.create(createCustomer);
            const savedCustomer = await this.customerRepository.save(newCustomer);

            return {
                success: true,
                message: 'Customer created successfully',
                data: savedCustomer
            };
        } catch (error) {
            throw new BadRequestException('Error creating customer: ' + error.message);
          }
    }

   async updateCustomer(customer_id: number, updateCustomer: UpdateCustomerDto) {
        try {
            const customer = await this.findById(customer_id);

            // Check if email is being updated and if it's already in use
            if (updateCustomer.email) {
                const existingCustomer = await this.customerRepository.findOne({
                    where: { email: updateCustomer.email }
                });

                if (existingCustomer && existingCustomer.customer_id !== customer_id) {
                    throw new ConflictException('Email already in use by another customer');
                }
            }

            // Validate phone number if it's being updated
            if (updateCustomer.phone && !/^\d{10}$/.test(updateCustomer.phone)) {
                throw new BadRequestException('Phone number must be 10 digits');
            }

            updateCustomer.updated_at = new Date().toISOString();; 

            this.customerRepository.merge(customer, updateCustomer);
            const updatedCustomer = await this.customerRepository.save(customer);

            return {
                success: true,
                message: 'Customer updated successfully',
                data: updatedCustomer
            };
        } catch (error) {
           
            throw new BadRequestException('Error updating customer: ' + error.message);
        }
    }

  async deleteCustomer(customer_id: number) {
    const customer = await this.findById(customer_id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${customer_id} not found`);
    }
    await this.customerRepository.remove(customer);
    return { message: `Customer with id ${customer_id} deleted successfully` };
  }

  async changeCustomerStatus(customer_id: number, status: string) {
try{

        const customer = await this.findById(customer_id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${customer_id} not found`);
    }
    customer.customer_status = status;
    await this.customerRepository.save(customer);
    return { message: `Customer status updated to ${status}` };
  }
catch (error) {
      throw new BadRequestException('Error changing customer status: ' + error.message);
    }
}

}
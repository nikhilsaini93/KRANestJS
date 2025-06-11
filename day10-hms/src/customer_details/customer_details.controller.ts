import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CustomerDetailsService } from './customer_details.service';
import { CreateCustomerDto } from './DTO/customer.dto';

@Controller('customer-details')
export class CustomerDetailsController {
    constructor(private readonly customerDetailsService: CustomerDetailsService){}

    @Get()
    async findAll(){
        return await this.customerDetailsService.findall()
    }


@Get(':id')
async findById(@Param('id') id: number){
    return await this.customerDetailsService.findById(+id)
}

@Post()
@HttpCode(HttpStatus.CREATED)
async createCustomer(@Body() createCustomer : CreateCustomerDto ){
    return await this.customerDetailsService.createCustomer(createCustomer)
}
}

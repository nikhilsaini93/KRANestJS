import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CustomerDetailsService } from './customer_details.service';
import { CreateCustomerDto } from './DTO/customer.dto';
import { UpdateCustomerDto } from './DTO/updatecustomer.dto';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { Role } from 'src/user-accounts/enitity/user-account.entity';
import { Roles } from 'src/auth/Decorators/roles.decorators';


@Controller('customer-details')
@UseGuards(jwtAuthGuards, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
export class CustomerDetailsController {
    constructor(private readonly customerDetailsService: CustomerDetailsService){}

    @Get()
   
    @HttpCode(HttpStatus.OK)
    async findAll(){
        return await this.customerDetailsService.findall()
    }


@Get(':id')

@HttpCode(HttpStatus.OK)
async findById(@Param('id') id: number){
    return await this.customerDetailsService.findById(+id)
}

@Post()
@HttpCode(HttpStatus.CREATED)
async createCustomer(@Body() createCustomer : CreateCustomerDto ){
    return await this.customerDetailsService.createCustomer(createCustomer)
}

@Patch(':id')
@HttpCode(HttpStatus.OK)
async updateCustomer(
    @Param('id') id: number,
    @Body() updateCustomer: UpdateCustomerDto
) {
    return await this.customerDetailsService.updateCustomer(+id, updateCustomer);
}

@Delete(':id')
@HttpCode(202)
async deleteCustomer(@Param('id') id: number) {
    return await this.customerDetailsService.deleteCustomer(+id);
}

@Patch(":id/status/:status")
@UseGuards(jwtAuthGuards, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER)
@HttpCode(HttpStatus.OK)
async updateCustomerStatus(@Param('id') id: number, @Param('status') status: string) {
    return await this.customerDetailsService.changeCustomerStatus(+id, status);
}
}
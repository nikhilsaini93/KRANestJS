import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiCreatedResponse({ description: 'Customer successfully created' })
  @ApiBadGatewayResponse({ description: 'Failed to create customer' })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all customers' })
  @ApiOkResponse({
    description: 'List of all customers',
    type: CreateCustomerDto,
    isArray: true,
  })
  findAll() {
    return this.customersService.findAll();
  }


  
  // @Get(':id')
  // @ApiOperation({ summary: 'Get a specific customer by ID' })
  // @ApiOkResponse({ description: 'Customer retrieved successfully' })
  // @ApiBadRequestResponse({ description: 'Invalid customer ID' })
  // findOne(@Param('id') id: string) {
  //   return this.customersService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update an existing customer' })
  // @ApiOkResponse({ description: 'Customer updated successfully' })
  // @ApiBadRequestResponse({ description: 'Invalid update data or customer ID' })
  // update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
  //   return this.customersService.update(+id, updateCustomerDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a customer by ID' })
  // @ApiOkResponse({ description: 'Customer deleted successfully' })
  // @ApiBadRequestResponse({ description: 'Invalid customer ID' })
  // remove(@Param('id') id: string) {
  //   return this.customersService.remove(+id);
  // }
}

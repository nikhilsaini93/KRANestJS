import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { CreateBussinessDto } from './dto/create-bussiness.dto';
import { UpdateBussinessDto } from './dto/update-bussiness.dto';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('bussinesses')
export class BussinessController {
  constructor(private readonly bussinessService: BussinessService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bussiness' })
  @ApiCreatedResponse({ description: 'Bussiness successfully created' })
  @ApiBadGatewayResponse({ description: 'Failed to create bussiness' })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  create(@Body() createBussinessDto: CreateBussinessDto) {
  
    return this.bussinessService.create(createBussinessDto);
  }
  
  
  @Get()
  @ApiOperation({ summary: 'Retrieve all bussinesses' })
  @ApiCreatedResponse({
    description: 'List of all bussinesses',
    type: CreateBussinessDto,
    isArray: true,
  })
  findAll() {
    return this.bussinessService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific bussiness by ID' })
  @ApiOkResponse({ description: 'Bussiness retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Invalid bussiness ID' })
  findOne(@Param('id') id: string) {
    return this.bussinessService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({summary :  'Update an existing bussiness'})
  @ApiOkResponse({description : 'Bussiness updated successfully'})
  @ApiBadRequestResponse({description : 'Invalid update data or bussiness ID'})
  update(@Param('id') id: string, @Body() updateBussinessDto: UpdateBussinessDto) {
    return this.bussinessService.update(+id, updateBussinessDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bussiness by ID' })
  @ApiOkResponse({ description: 'Bussiness deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid bussiness ID' })
  remove(@Param('id') id: string) {
    return this.bussinessService.remove(+id);
  }
}

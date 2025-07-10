import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { CreateBussinessDto } from './dto/create-bussiness.dto';
import { UpdateBussinessDto } from './dto/update-bussiness.dto';

@Controller('bussinesses')
export class BussinessController {
  constructor(private readonly bussinessService: BussinessService) {}

  @Post()
  create(@Body() createBussinessDto: CreateBussinessDto) {
  
    return this.bussinessService.create(createBussinessDto);
  }
  
  
  @Get()
  findAll() {
    return this.bussinessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bussinessService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBussinessDto: UpdateBussinessDto) {
    return this.bussinessService.update(+id, updateBussinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bussinessService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Res,  } from '@nestjs/common';
import { MarksService } from './marks.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { Response } from 'express';
@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post()
  create(@Body() createMarkDto: CreateMarkDto) {
    return this.marksService.create(createMarkDto);
  }

  @Get()
  findAll() {
    return this.marksService.findAll();
  }

  @Get('result/:userId')
  async generateResult(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('format') format: 'csv' | 'pdf' = 'csv',
    @Res() res: Response,
  ) {
    return this.marksService.generateResult(userId, format, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkDto: UpdateMarkDto) {
    return this.marksService.update(+id, updateMarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marksService.remove(+id);
  }
}

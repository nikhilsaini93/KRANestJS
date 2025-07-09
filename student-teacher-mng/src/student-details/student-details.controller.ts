import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentDetailsService } from './student-details.service';
import { CreateStudentDetailDto } from './dto/create-student-detail.dto';
import { UpdateStudentDetailDto } from './dto/update-student-detail.dto';

@Controller('studentdetails')
export class StudentDetailsController {
  constructor(private readonly studentDetailsService: StudentDetailsService) {}

  @Post()
  create(@Body() createStudentDetailDto: CreateStudentDetailDto) {
    return this.studentDetailsService.create(createStudentDetailDto);
  }

  @Get()
  findAll() {
    return this.studentDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDetailDto: UpdateStudentDetailDto) {
    return this.studentDetailsService.update(+id, updateStudentDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentDetailsService.remove(+id);
  }
}

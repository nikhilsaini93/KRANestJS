import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StaffMngService } from './staff_mng.service';
import { CreateStaffDto } from './DTO/staff-mng.dto';
import { CreateStaffShiftDto } from 'src/staff-shifts/DTO/staffshift.dto';
import { CreateTaskDto } from 'src/task-mng/DTO/task-mng.dto';

@Controller('staff-mng')
export class StaffMngController {
  constructor(private readonly staffMngService: StaffMngService) {}

  // Staff endpoints
  @Get()
  async getAllStaff() {
    return await this.staffMngService.findallStaff();
  }

  @Get('attendance')
  async getAllAttendence() {
    return await this.staffMngService.findAllAttendence();
  }

  @Get('attendance/staff/:staffId')
  async getAttendenceByStaffId(@Param('staffId') staffId: number) {
    return await this.staffMngService.findAttendenceByStaffId(+staffId);
  }

  @Get('attendance/:id')
  async getAttendenceById(@Param('id') id: number) {
    return await this.staffMngService.findAttendenceById(+id);
  }

  @Get('shifts')
  async getAllShifts() {
    return await this.staffMngService.findallStaffShifts();
  }

  @Get('shifts/staff/:staffId')
  async getShiftsByStaffId(@Param('staffId') staffId: number) {
    return await this.staffMngService.findStaffShiftsByStaffId(+staffId);
  }

  @Get('shifts/:id')
  async getShifts(@Param('id') id: number) {
    return await this.staffMngService.findStaffShiftsById(+id);
  }

  @Get('task')
  async getAllTask() {
    return await this.staffMngService.findallTask();
  }

  @Get('task/staff/:staffId')
  async getTaskByStaffId(@Param('staffId') staffId: number) {
    return await this.staffMngService.findTaskByStaffId(+staffId);
  }

  @Get('task/:id')
  async gettaskByID(@Param('id') id: number) {
    return await this.staffMngService.findTaskById(+id);
  }

  @Get(':id')
  async getStaffById(@Param('id') id: number) {
    return await this.staffMngService.findStaffById(+id);
  }

  @Post()
  async createStaff(@Body() createStaffDto: CreateStaffDto) {
    return await this.staffMngService.createStaff(createStaffDto);
  }

  @Delete(':id')
  async deleteStaff(@Param('id') id: number) {
    return await this.staffMngService.deletestaff(+id);
  }

  // Attendance endpoints

  @Post('attendance/check-in/:id')
  async createAttendence(@Param('id') id: number) {
    return await this.staffMngService.Postattendence(+id);
  }

  @Post('attendance/check-out/:id')
  async createAttendenceCheckOut(@Param('id') id: number) {
    return await this.staffMngService.postAttenddenceCheckOutTime(+id);
  }

  // Shift endpoints

  @Post('shifts')
  async createShifts(@Body() createStaffShiftDto: CreateStaffShiftDto) {
    return await this.staffMngService.createStaffShifts(createStaffShiftDto);
  }

  @Delete('shifts/:id')
  async deleteShifts(@Param('id') id: number) {
    return await this.staffMngService.deleteStaffShift(+id);
  }

  // Task endpoints

  @Post('task')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.staffMngService.createTask(createTaskDto);
  }

  @Delete('task/:id')
  async deleteTask(@Param('id') id: number) {
    return await this.staffMngService.deleteTask(+id);
  }
}

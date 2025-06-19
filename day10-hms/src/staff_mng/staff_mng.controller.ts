import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StaffMngService } from './staff_mng.service';
import { CreateStaffDto } from './DTO/staff-mng.dto';
import { CreateStaffShiftDto } from 'src/staff-shifts/DTO/staffshift.dto';
import { CreateTaskDto } from 'src/task-mng/DTO/task-mng.dto';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { Role } from 'src/user-accounts/enitity/user-account.entity';
import { Roles } from 'src/auth/Decorators/roles.decorators';

@Controller('staff-mng')
export class StaffMngController {
  constructor(private readonly staffMngService: StaffMngService) {}

  @Get()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAllStaff() {
    return await this.staffMngService.findallStaff();
  }

  @Get('attendance')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAllAttendence() {
    return await this.staffMngService.findAllAttendence();
  }

  @Get('attendance/staff/:staffId')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAttendenceByStaffId(@Param('staffId') staffId: number) {
    return await this.staffMngService.findAttendenceByStaffId(+staffId);
  }

  @Get('attendance/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAttendenceById(@Param('id') id: number) {
    return await this.staffMngService.findAttendenceById(+id);
  }

  @Get('shifts')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async getAllShifts() {
    return await this.staffMngService.findallStaffShifts();
  }

  @Get('shifts/staff/:staffId')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async getShiftsByStaffId(@Param('staffId') staffId: number) {
    return await this.staffMngService.findStaffShiftsByStaffId(+staffId);
  }

  @Get('shifts/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async getShifts(@Param('id') id: number) {
    return await this.staffMngService.findStaffShiftsById(+id);
  }

  @Get('task')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAllTask() {
    return await this.staffMngService.findallTask();
  }

  @Get('task/staff/:staffId')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async getTaskByStaffId(@Param('staffId') staffId: number) {
    return await this.staffMngService.findTaskByStaffId(+staffId);
  }

  @Get('task/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async gettaskByID(@Param('id') id: number) {
    return await this.staffMngService.findTaskById(+id);
  }

  @Get(':id')
  async getStaffById(@Param('id') id: number) {
    return await this.staffMngService.findStaffById(+id);
  }

  @Post()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async createStaff(@Body() createStaffDto: CreateStaffDto) {
    return await this.staffMngService.createStaff(createStaffDto);
  }

  @Delete(':id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async deleteStaff(@Param('id') id: number) {
    return await this.staffMngService.deletestaff(+id);
  }

  // Attendance endpoints

  @Post('attendance/check-in/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async createAttendence(@Param('id') id: number) {
    return await this.staffMngService.Postattendence(+id);
  }

  @Post('attendance/check-out/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async createAttendenceCheckOut(@Param('id') id: number) {
    return await this.staffMngService.postAttenddenceCheckOutTime(+id);
  }

  // Shift endpoints

  @Post('shifts')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async createShifts(@Body() createStaffShiftDto: CreateStaffShiftDto) {
    return await this.staffMngService.createStaffShifts(createStaffShiftDto);
  }

  @Delete('shifts/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async deleteShifts(@Param('id') id: number) {
    return await this.staffMngService.deleteStaffShift(+id);
  }

  // Task endpoints

  @Post('task')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.staffMngService.createTask(createTaskDto);
  }

  @Delete('task/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async deleteTask(@Param('id') id: number) {
    return await this.staffMngService.deleteTask(+id);
  }
}

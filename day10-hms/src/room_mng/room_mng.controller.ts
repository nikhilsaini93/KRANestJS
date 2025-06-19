import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoomMngService } from './room_mng.service';
import { CreateRoomMngDto } from './DTO/room-mng.dto';
import { CreateLostFoundDto } from 'src/lost-found-management/DTO/lost-found-mng.dto';
import { CreateHousekeepingTaskDto } from 'src/houseKeeping/DTO/housekeeping.dto';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/auth/Decorators/roles.decorators';
import { Role } from 'src/user-accounts/enitity/user-account.entity';
import { UpdateBookingDto } from 'src/bookings/DTO/updatebooking.dto';
import { UpdateRoomMngDto } from './DTO/updatroommng.dto';

@Controller('room-mng')
@UseGuards(jwtAuthGuards, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
export class RoomMngController {
  constructor(private readonly roomMngService: RoomMngService) {}

  @Get()
  async findAllRoomMng() {
    return await this.roomMngService.findall();
  }

  @Get('lost-found')
  async findAllLostFound() {
    return await this.roomMngService.findallLostFound();
  }

  @Get('housekeeping-tasks')
  
  async findAllHousekeepingTasks() {
    return await this.roomMngService.findAllHousekeepingTasks();
  }

  @Get('housekeeping-tasks/:id')
  async findHousekeepingTaskById(@Param('id') id: number) {
    return await this.roomMngService.findHousekeepingTaskById(+id);
  }

  @Get('housekeeping-tasks/staff/:id')
  async findHosuekeepingTaskbyStaffId(@Param('id') id: number) {
    return await this.roomMngService.findHosuekeepingTaskbyStaffId(+id);
  }

  @Get('housekeeping-tasks/room/:id')

  async findHouseKeepingTaskByRoomId(@Param('id') id: number) {
    return await this.roomMngService.findHouseKeepingTaskByRoomId(+id);
  }

  @Get(':id')
  async findRoomMngById(@Param('id') id: number) {
    return await this.roomMngService.findRoomMngById(+id);
  }

  @Get('lost-found/:id')
  async findLostFoundById(@Param('id') id: number) {
    return await this.roomMngService.findLostFoundById(+id);
  }

  @Post()
      @UseGuards(jwtAuthGuards, RolesGuard)
    @Roles(Role.ADMIN, Role.MANAGER)
  async createRoomMng(@Body() createRoomMngDto: CreateRoomMngDto) {
    return await this.roomMngService.createRoommng(createRoomMngDto);
  }

  @Post('lost-found')
  async createlostFound(@Body() createLostFoundDto: CreateLostFoundDto) {
    return await this.roomMngService.createlostFound(createLostFoundDto);
  }

  @Patch('lost-found/:id/status/:status')
      @UseGuards(jwtAuthGuards, RolesGuard)
    @Roles(Role.ADMIN, Role.MANAGER , Role.STAFF)
  async updateLostFoundStatus(
    @Param('id') id: number,
    @Param('status') status: string,
  ) {
    return await this.roomMngService.chnagestatusLostFound(+id, status);
  }

  @Post('housekeeping-tasks')
      @UseGuards(jwtAuthGuards, RolesGuard)
    @Roles(Role.ADMIN, Role.MANAGER )
  async createHousekeepingTask(
    @Body() createHousekeepingTaskDto: CreateHousekeepingTaskDto,
  ) {
    return await this.roomMngService.createHousekeepingTask(
      createHousekeepingTaskDto,
    );
  }

  @Patch(':id')
      @UseGuards(jwtAuthGuards, RolesGuard)
    @Roles(Role.ADMIN, Role.MANAGER)
    async updateRoomMng(
    @Param('id') id: number,
    @Body() updateRoomMngDto: UpdateRoomMngDto,
    ) {
    return await this.roomMngService.updateRoommng(+id, updateRoomMngDto);
  }


}

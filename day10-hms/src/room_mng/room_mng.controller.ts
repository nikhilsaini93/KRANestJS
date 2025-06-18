import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomMngService } from './room_mng.service';
import { CreateRoomMngDto } from './DTO/room-mng.dto';
import { CreateLostFoundDto } from 'src/lost-found-management/DTO/lost-found-mng.dto';
import { CreateHousekeepingTaskDto } from 'src/houseKeeping/DTO/housekeeping.dto';

@Controller('room-mng')
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
  async createRoomMng(@Body() createRoomMngDto: CreateRoomMngDto) {
    return await this.roomMngService.createRoommng(createRoomMngDto);
  }

  @Post('lost-found')
  async createlostFound(@Body() createLostFoundDto: CreateLostFoundDto) {
    return await this.roomMngService.createlostFound(createLostFoundDto);
  }

  @Patch('lost-found/:id/status/:status')
  async updateLostFoundStatus(
    @Param('id') id: number,
    @Param('status') status: string,
  ) {
    return await this.roomMngService.chnagestatusLostFound(+id, status);
  }

  @Post('housekeeping-tasks')
  async createHousekeepingTask(
    @Body() createHousekeepingTaskDto: CreateHousekeepingTaskDto,
  ) {
    return await this.roomMngService.createHousekeepingTask(
      createHousekeepingTaskDto,
    );
  }
}

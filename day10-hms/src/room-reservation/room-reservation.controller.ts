import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoomReservationService } from './room-reservation.service';
import { CreateRoomReservationDto } from './DTO/room_reservation.dto';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { Role } from 'src/user-accounts/enitity/user-account.entity';
import { Roles } from 'src/auth/Decorators/roles.decorators';
import { UpdateRoomReservationDto } from './DTO/update.room_reservation.dto';

@Controller('room-reservation')
@UseGuards(jwtAuthGuards, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
export class RoomReservationController {
  constructor(
    private readonly roomReservationService: RoomReservationService,
  ) {}

  @Get()
  async findAll() {
    return await this.roomReservationService.findall();
  }

  @Post()
  async createRoomReservation(
    @Body() createRoomReservationDto: CreateRoomReservationDto,
  ) {
    return await this.roomReservationService.createRoomReservation(
      createRoomReservationDto,
    );
  }

  @Patch(':id/check-in')
  async postCheckInTime(@Param('id') id: number) {
    return await this.roomReservationService.postCheckInTime(+id);
  }
  @Patch(':id/check-out')
  async postCheckOutTime(@Param('id') id: number) {
    return await this.roomReservationService.postCheckOutTime(+id);
  }

  @Patch(':id/status/:status')
  async cancelRoomReservation(
    @Param('id') id: number,
    @Param('status') status: string,
  ) {
    return await this.roomReservationService.changeRoomReservationStatus(
      +id,
      status,
    );
  }

  @Delete(':id')
      @UseGuards(jwtAuthGuards, RolesGuard)
    @Roles(Role.ADMIN, Role.MANAGER )
  async deleteRoomReservation(@Param('id') id: number) {
    return await this.roomReservationService.deleteRoomReservation(+id);
  }

  @Patch(':id')
    async updateRoomReservation(
    @Param('id') id: number,
    @Body() updateRoomReservationDto: UpdateRoomReservationDto,
  ) {
    return await this.roomReservationService.updateRoomReservation(
      +id,
      updateRoomReservationDto,
    );
  }
}

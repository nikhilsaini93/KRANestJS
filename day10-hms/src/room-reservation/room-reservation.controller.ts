import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomReservationService } from './room-reservation.service';
import { CreateRoomReservationDto } from './DTO/room_reservation.dto';

@Controller('room-reservation')
export class RoomReservationController {
    constructor(private readonly roomReservationService: RoomReservationService) {}

    @Get()
    async findAll(){
        return await this.roomReservationService.findall()
    }

    @Post()
    async createRoomReservation(@Body() createRoomReservationDto: CreateRoomReservationDto){
        return await this.roomReservationService.createRoomReservation(createRoomReservationDto)
    }

    @Patch(':id/check-in')
    async postCheckInTime(@Param("id") id: number){
        return await this.roomReservationService.postCheckInTime(+id)
    }
    @Patch(':id/check-out')
    async postCheckOutTime(@Param("id") id: number){
        return await this.roomReservationService.postCheckOutTime(+id)
    }
    



}

import { Module } from '@nestjs/common';
import { RoomReservationController } from './room-reservation.controller';
import { RoomReservationService } from './room-reservation.service';
import { RoomReservation } from './enitity/room-reservation';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoomReservation])],
  controllers: [RoomReservationController],
  providers: [RoomReservationService]
})
export class RoomReservationModule {}

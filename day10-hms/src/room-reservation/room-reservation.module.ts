import { Module } from '@nestjs/common';
import { RoomReservationController } from './room-reservation.controller';
import { RoomReservationService } from './room-reservation.service';

@Module({
  controllers: [RoomReservationController],
  providers: [RoomReservationService]
})
export class RoomReservationModule {}

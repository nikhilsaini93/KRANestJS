import { Module } from '@nestjs/common';
import { RoomReservationController } from './room-reservation.controller';
import { RoomReservationService } from './room-reservation.service';
import { RoomReservation } from './enitity/room-reservation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomReservation]) , AuthModule],
  controllers: [RoomReservationController],
  providers: [RoomReservationService]
})
export class RoomReservationModule {}

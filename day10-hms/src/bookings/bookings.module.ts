import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entity/booking.entity';
import { BookingDetails } from 'src/bookingdetails/enitity/bookingdetails.entity';
import { Customer } from 'src/customer_details/entity/customer_details.entitiy';
import { Payment } from 'src/payment/enitity/payment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoomReservation } from 'src/room-reservation/enitity/room-reservation';

@Module({
  imports: [TypeOrmModule.forFeature([Booking , BookingDetails , Customer , Payment , RoomReservation]) ,AuthModule],
  controllers: [BookingsController],
  providers: [BookingsService]

})
export class BookingsModule {}

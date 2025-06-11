import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entity/booking.entity';
import { BookingDetails } from 'src/bookingdetails/enitity/bookingdetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking , BookingDetails])],
  controllers: [BookingsController],
  providers: [BookingsService]

})
export class BookingsModule {}

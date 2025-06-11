import { Module } from '@nestjs/common';
import { BookingdetailsController } from './bookingdetails.controller';
import { BookingdetailsService } from './bookingdetails.service';

@Module({
  controllers: [BookingdetailsController],
  providers: [BookingdetailsService]
})
export class BookingdetailsModule {}

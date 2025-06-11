import { Body, Controller, Get, NotAcceptableException, Param, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './DTO/bookings.dto';
import { CreateBookingDetailsDto } from 'src/bookingdetails/DTO/bookingdetails.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

     @Get()
    async findAllBooking() {
        return await this.bookingsService.findAllBooking();
    }
    @Get("details")
    async findAllBookingDetails() {
        return await this.bookingsService.findAllBookingDetails();
    }

    @Get(':id')
    async findAllBookingsbyBookingId(@Param('id') id: number) {
        return await this.bookingsService.findBookingsbyBookingId(+id);
    }

    @Get('details/:id')
    async findAllBookingDetailsbyBookingDetailsId(@Param('id') id: number) {
        return await this.bookingsService.findAllBookingDetailsbyBookingDetailsId(+id);
    }

    @Get("customerdetails/:id")
    async findbybookingsusingcustomerid(@Param('id') id: number) {
        return await this.bookingsService.findbybookingsusingcustomerid(+id);
    }








    @Post()
    async createBooking(@Body() createBookingDto: CreateBookingDto){
        try {
            const newBooking = await this.bookingsService.createBooking(createBookingDto);
            return newBooking;
        } catch (error) {
            throw new NotAcceptableException(
                `Failed to create booking: ${error.message}`
            );
        }
    }

    @Post("details")
    async createBookingDetails(@Body() createBookingDetailsDto: CreateBookingDetailsDto){
        
            const newBookingDetails = await this.bookingsService.createBookingDetails(createBookingDetailsDto);
            return newBookingDetails
        

   
    }


}

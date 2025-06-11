import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entity/booking.entity';
import { Repository } from 'typeorm';
import { BookingDetails } from 'src/bookingdetails/enitity/bookingdetails.entity';
import { CreateBookingDto } from './DTO/bookings.dto';
import { CreateBookingDetailsDto } from 'src/bookingdetails/DTO/bookingdetails.dto';

@Injectable()
export class BookingsService {
    constructor(@InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(BookingDetails)
    private readonly bookingDetailsRepository: Repository<BookingDetails>
){}

   async findAllBooking(){
    return await this.bookingRepository.find({
        relations: {
            customer: true,
            booking_details: true
        }
    });
   }

   async findAllBookingDetails(){
    return await this.bookingDetailsRepository.find();

   }

   async findBookingsbyBookingId(booking_id: number) {
    const res = await this.bookingRepository.findOne({where : {booking_id}})
    if(!res) {
        throw new NotFoundException(`Booking not found with id ${booking_id}`)
    }
    return res
}

   async findAllBookingDetailsbyBookingDetailsId(bookingDetailsId: number) {
    const res = await this.bookingDetailsRepository.findOne({where : {booking_details_id : bookingDetailsId}})
    if(!res) {
        throw new NotFoundException(`Booking Details not found with id ${bookingDetailsId}`)
    }
    return res
   }


async findbybookingsusingcustomerid(customerId: number) {
    const bookings = await this.bookingRepository.find({
        where: {
            customer: { customer_id: customerId }
        },
        relations: {
            customer: true,
            booking_details: true
        }
    });

    if (!bookings || bookings.length === 0) {
        throw new NotAcceptableException(`No bookings found for customer ID ${customerId}`);
    }

    return bookings;
}




// Add the service method
async createBooking(createBookingDto: CreateBookingDto) {
    try {
        // Create new booking instance
        const newBooking = this.bookingRepository.create({
            hotel_name: createBookingDto.hotel_name,
            date: createBookingDto.date,
            booking_status: createBookingDto.booking_status || 'pending',
            amenities: createBookingDto.amenities,
        });

        // Set the relationships
        newBooking.customer = { customer_id: createBookingDto.customerId } as any;
        newBooking.booking_details = { booking_details_id: createBookingDto.bookingDetailsId } as any;

        // Save the booking
        const savedBooking = await this.bookingRepository.save(newBooking);

        // Fetch the complete booking with relations
        const completeBooking = await this.bookingRepository.findOne({
            where: { booking_id: savedBooking.booking_id },
            relations: {
                customer: true,
                booking_details: true
            }
        });

        if (!completeBooking) {
            throw new NotAcceptableException('Failed to create booking');
        }

        return completeBooking;

    } catch (error) {
        throw new NotAcceptableException(
            `Failed to create booking: ${error.message}`
        );
    }
}


async createBookingDetails(createBookingDetailsDto: CreateBookingDetailsDto) {
    try {
        // Create new booking instance
        const newBookingDetails = this.bookingDetailsRepository.create({
            booking_date: createBookingDetailsDto.booking_date,
            room_type: createBookingDetailsDto.room_type,
            is_available: createBookingDetailsDto.is_available || true,
            total_bill: createBookingDetailsDto.total_bill,
        });
        // Save the booking
        const savedBookingDetails = await this.bookingDetailsRepository.save(newBookingDetails);
        return savedBookingDetails;

    }catch(err){
        throw new NotAcceptableException(
            `Failed to create booking details: ${err.message}`
        );
    }




      


}
}

import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entity/booking.entity';
import { Repository } from 'typeorm';
import { BookingDetails } from 'src/bookingdetails/enitity/bookingdetails.entity';
import { CreateBookingDto } from './DTO/bookings.dto';
import { CreateBookingDetailsDto } from 'src/bookingdetails/DTO/bookingdetails.dto';
import { Customer } from 'src/customer_details/entity/customer_details.entitiy';
import { Payment } from 'src/payment/enitity/payment.entity';
import { RoomReservation } from 'src/room-reservation/enitity/room-reservation';
import { UpdateBookingDto } from './DTO/updatebooking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(BookingDetails)
    private readonly bookingDetailsRepository: Repository<BookingDetails>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(RoomReservation)
    private readonly roomReservationRepository: Repository<RoomReservation>,
  ) {}

  async findAllBooking() {
    return await this.bookingRepository.find({
      relations: {
        customer: true,
        booking_details: true,
        room_reservations: true,
      },
    });
  }

  async findAllBookingDetails() {
    return await this.bookingDetailsRepository.find({
      relations: {
        payment: true,
        customer: true,
      },
    });
  }

  async findBookingsbyBookingId(booking_id: number) {
    const res = await this.bookingRepository.findOne({ where: { booking_id } });
    if (!res) {
      throw new NotFoundException(`Booking not found with id ${booking_id}`);
    }
    return res;
  }

  async findAllBookingDetailsbyBookingDetailsId(bookingDetailsId: number) {
    const res = await this.bookingDetailsRepository.findOne({
      where: { booking_details_id: bookingDetailsId },
    });
    if (!res) {
      throw new NotFoundException(
        `Booking Details not found with id ${bookingDetailsId}`,
      );
    }
    return res;
  }

  async findbybookingsusingcustomerid(customerId: number) {
    const bookings = await this.bookingRepository.find({
      where: {
        customer: { customer_id: customerId },
      },
      relations: {
        customer: true,
        booking_details: true,
      },
    });

    if (!bookings || bookings.length === 0) {
      throw new NotAcceptableException(
        `No bookings found for customer ID ${customerId}`,
      );
    }

    return bookings;
  }

  // Add the service method
  async createBooking(createBookingDto: CreateBookingDto) {
    try {
      // Check if customer exists
      const customer = await this.customerRepository.findOne({
        where: { customer_id: createBookingDto.customerId },
      });

      if (!customer) {
        throw new NotAcceptableException(
          `Customer with ID ${createBookingDto.customerId} not found`,
        );
      }

      if (customer.customer_status !== 'active') {
        throw new NotAcceptableException(
          `Customer with ID ${createBookingDto.customerId} is not active your booking cannot be created , your money will be refunded in one hour if money is deducted`,
        );
      }

      const newBooking = this.bookingRepository.create({
        hotel_name: createBookingDto.hotel_name,
        date: createBookingDto.date,
        booking_status: createBookingDto.booking_status || 'pending',
        amenities: createBookingDto.amenities,
      });

      // Set the relationships
      newBooking.customer = { customer_id: createBookingDto.customerId } as any;
      newBooking.booking_details = {
        booking_details_id: createBookingDto.bookingDetailsId,
      } as any;

      // Save the booking
      const savedBooking = await this.bookingRepository.save(newBooking);

      // Fetch the complete booking with relations
      const completeBooking = await this.bookingRepository.findOne({
        where: { booking_id: savedBooking.booking_id },
        relations: {
          customer: true,
          booking_details: true,
        },
      });

      if (!completeBooking) {
        throw new NotAcceptableException('Failed to create booking');
      }

      return completeBooking;
    } catch (error) {
      throw new NotAcceptableException(
        `Failed to create booking: ${error.message}`,
      );
    }
  }

  // async createBookingDetails(createBookingDetailsDto: CreateBookingDetailsDto) {
  //     try {
  //         // Create new booking instance

  //          const customer = await this.customerRepository.findOne({
  //             where: { customer_id: createBookingDetailsDto.customer_id }
  //         });

  //         if (!customer) {
  //             throw new NotAcceptableException(`Customer with ID ${createBookingDetailsDto.customer_id} not found`);
  //         }

  //         if (customer.customer_status !== 'active') {
  //             throw new NotAcceptableException(`Customer with ID ${createBookingDetailsDto.customer_id} is not active your booking cannot be created , your money will be refunded in one hour if money is deducted`);
  //         }

  //         const newBookingDetails = this.bookingDetailsRepository.create({
  //             booking_date: createBookingDetailsDto.booking_date,
  //             room_type: createBookingDetailsDto.room_type,
  //             is_available: createBookingDetailsDto.is_available || true,
  //             total_bill: createBookingDetailsDto.total_bill,
  //             payment: { payment_id: createBookingDetailsDto.payment_id } as any,
  //             customer: { customer_id: createBookingDetailsDto.customer_id } as any,

  //         });
  //         // Save the booking
  //         const savedBookingDetails = await this.bookingDetailsRepository.save(newBookingDetails);
  //         return savedBookingDetails;

  //     }catch(err){
  //         throw new NotAcceptableException(
  //             `Failed to create booking details: ${err.message}`
  //         );
  //     }

  async createBookingDetails(createBookingDetailsDto: CreateBookingDetailsDto) {
    try {
      // Validate customer
      const customer = await this.customerRepository.findOne({
        where: { customer_id: createBookingDetailsDto.customer_id },
      });

      if (!customer) {
        throw new NotAcceptableException(
          `Customer with ID ${createBookingDetailsDto.customer_id} not found`,
        );
      }
      if (customer.customer_status !== 'active') {
        throw new NotAcceptableException(
          `Customer with ID ${createBookingDetailsDto.customer_id} is not active your booking cannot be created , your money will be refunded in one hour if money is deducted`,
        );
      }

      // Validate payment if provided
      let payment: Payment | null = null;
      if (createBookingDetailsDto.payment_id) {
        payment = await this.paymentRepository.findOne({
          where: { id: createBookingDetailsDto.payment_id },
        });

        if (!payment) {
          throw new NotAcceptableException(
            `Payment with ID ${createBookingDetailsDto.payment_id} not found`,
          );
        }

        if (payment?.status !== 'success') {
          throw new NotAcceptableException(
            `Payment with ID ${createBookingDetailsDto.payment_id} is not successfull that why boking details cannot be created`,
          );
        }
      }

      // Create booking details with proper typing
      const bookingDetails = new BookingDetails();
      bookingDetails.booking_date = createBookingDetailsDto.booking_date;
      bookingDetails.room_type = createBookingDetailsDto.room_type;
      bookingDetails.is_available =
        createBookingDetailsDto.is_available ?? true;
      bookingDetails.total_bill = createBookingDetailsDto.total_bill;
      bookingDetails.customer = customer;

      if (payment) {
        bookingDetails.payment = payment;
      }

      const savedBookingDetails =
        await this.bookingDetailsRepository.save(bookingDetails);

      // Fetch complete booking details with relations
      const completeBookingDetails =
        await this.bookingDetailsRepository.findOne({
          where: { booking_details_id: savedBookingDetails.booking_details_id },
          relations: ['payment', 'customer'],
        });

      return {
        success: true,
        message: 'Booking details created successfully',
        data: completeBookingDetails,
      };
    } catch (error) {
      throw new NotAcceptableException(
        `Failed to create booking details: ${error.message}`,
      );
    }
  }

  async findRoomReservationByBookingId(bookingId: number) {
    const roomReservations = await this.roomReservationRepository.find({
      where: { booking: { booking_id: bookingId } },
      relations: ['booking'],
    });

    if (!roomReservations || roomReservations.length === 0) {
      throw new NotFoundException(
        `No room reservations found for booking ID ${bookingId}`,
      );
    }

    return roomReservations;
  }

  async chnangeRoomReservationStatusUseingBookingId(
    bookingId: number,
    status: string,
  ) {
    const roomReservations = await this.roomReservationRepository.find({
      where: { booking: { booking_id: bookingId } },
      relations: ['booking'],
    });

    if (!roomReservations || roomReservations.length === 0) {
      throw new NotFoundException(
        `No room reservations found for booking ID ${bookingId}`,
      );
    }

    // Update the status of each room reservation
    for (const reservation of roomReservations) {
      reservation.room_reservation_status = status;
      await this.roomReservationRepository.save(reservation);
    }

    return {
      success: true,
      message: `Room reservation status updated to ${status} for booking ID ${bookingId}`,
      data: roomReservations,
    };
  }

  async updateBooking(bookingId: number, updateBookingDto: UpdateBookingDto) {
    try {
      const booking = await this.findBookingsbyBookingId(bookingId);

      if (!booking) {
        throw new NotFoundException(`Booking not found with id ${bookingId}`);
      }

      this.bookingRepository.merge(booking, updateBookingDto);
      const updatedBooking = await this.bookingRepository.save(booking);
      return updatedBooking;

      // Update the booking properties
    } catch (error) {
      throw new NotAcceptableException(
        `Failed to update booking: ${error.message}`,
      );
    }
  }

  async deleteBooking(bookingId: number) {
    const booking = await this.findBookingsbyBookingId(bookingId);
    if (!booking) {
      throw new NotFoundException(`Booking not found with id ${bookingId}`);
    }
    await this.bookingRepository.remove(booking);
    return { message: `Booking with id ${bookingId} deleted successfully` };
  }

}

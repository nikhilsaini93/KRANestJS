import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './DTO/bookings.dto';
import { CreateBookingDetailsDto } from 'src/bookingdetails/DTO/bookingdetails.dto';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { Roles } from 'src/auth/Decorators/roles.decorators';
import { Role } from 'src/user-accounts/enitity/user-account.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async findAllBooking() {
    return await this.bookingsService.findAllBooking();
  }
  @Get('details')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async findAllBookingDetails() {
    return await this.bookingsService.findAllBookingDetails();
  }

  @Get(':id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async findAllBookingsbyBookingId(@Param('id') id: number) {
    return await this.bookingsService.findBookingsbyBookingId(+id);
  }

  @Get('details/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async findAllBookingDetailsbyBookingDetailsId(@Param('id') id: number) {
    return await this.bookingsService.findAllBookingDetailsbyBookingDetailsId(
      +id,
    );
  }

  @Get('customerdetails/:id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async findbybookingsusingcustomerid(@Param('id') id: number) {
    return await this.bookingsService.findbybookingsusingcustomerid(+id);
  }

  @Post()
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    
      const newBooking =
        await this.bookingsService.createBooking(createBookingDto);
      return newBooking;
    
  }

  @Post('details')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async createBookingDetails(
    @Body() createBookingDetailsDto: CreateBookingDetailsDto,
  ) {
    const newBookingDetails = await this.bookingsService.createBookingDetails(
      createBookingDetailsDto,
    );
    return newBookingDetails;
  }

  @Patch('room-reservations/:BookingId/status/:status')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async findRoomReservationsByBookingIdAndStatus(
    @Param('BookingId') BookingId: number,
    @Param('status') status: string,
  ) {
    return await this.bookingsService.chnangeRoomReservationStatusUseingBookingId(
      +BookingId,
      status,
    );
  }

  @Patch(':id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  async updateBooking(
    @Param('id') id: number,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    const updatedBooking = await this.bookingsService.updateBooking(
      +id,
      createBookingDto,
    );
    return updatedBooking;
  }

  @Delete(':id')
  @UseGuards(jwtAuthGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async deleteBooking(@Param('id') id: number) {
    return await this.bookingsService.deleteBooking(+id);
  }

}

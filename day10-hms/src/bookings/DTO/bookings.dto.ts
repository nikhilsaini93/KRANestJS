import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    hotel_name: string;

    @IsNotEmpty()
    date: string;

    @IsString()
    booking_status: string;

    @IsString()
    @IsNotEmpty()
    amenities: string;

    @IsNumber()
    @IsNotEmpty()
    customerId: number;

    @IsNumber()
    @IsNotEmpty()
    bookingDetailsId: number;
}



import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateBookingDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    hotel_name: string;

    
    @IsOptional()
    @IsNotEmpty()
    date: string;

    
    @IsOptional()
    @IsString()
    booking_status: string;

    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    amenities: string;


    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    customerId: number;


    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    bookingDetailsId: number;
}
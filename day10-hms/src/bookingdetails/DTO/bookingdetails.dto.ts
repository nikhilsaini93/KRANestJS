import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDetailsDto {
    @IsNotEmpty()
    @Type(() => Date)
    booking_date: string;

    @IsString()
    @IsNotEmpty()
    room_type: string;

    @IsBoolean()
    is_available: boolean = true;

    @IsNumber()
    @IsNotEmpty()
    total_bill: number;

    @IsNumber()
    @IsNotEmpty()
    payment_id: number;
}
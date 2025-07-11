import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomReservationDto {
    @IsNumber()
    @IsNotEmpty()
    bookingId: number;

    @IsString()
    @IsNotEmpty()
    booking_type: string;

    @IsString()
    room_reservation_status: string = 'pending';

    @IsBoolean()
    is_room_available: boolean = true;

    @IsOptional()
    check_in?: string;

    @IsOptional()
    check_out_time?: string;


    @IsOptional()
    @IsNumber()
    channelManagementId?: number |undefined

    @IsNumber()
    @IsOptional()
    extra_fees?: number = 0;

    
}
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
    @Type(() => Date)
    check_in?: string;

    @IsOptional()
    @Type(() => Date)
    check_out_time?: string;

    @IsNumber()
    channelManagementId: number |undefined

    @IsNumber()
    @IsOptional()
    extra_fees?: number = 0;

    
}
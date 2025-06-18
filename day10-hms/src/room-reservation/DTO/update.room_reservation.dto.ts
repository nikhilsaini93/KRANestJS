import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional, IsDate } from 'class-validator';


export class UpdateRoomReservationDto {
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    bookingId?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    booking_type?: string;

    @IsOptional()
    @IsString()
    room_reservation_status?: string = 'pending';

    @IsOptional()
    @IsBoolean()
    is_room_available?: boolean = true;
      


    @IsOptional()
    @IsNumber()
    channelManagementId?: number |undefined


    @IsOptional()
    @IsNumber()
    @IsOptional()
    extra_fees?: number = 0;

    
}


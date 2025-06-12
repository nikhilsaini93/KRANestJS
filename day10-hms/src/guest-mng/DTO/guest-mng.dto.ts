import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGuestMngDto {
    @IsNumber()
    @IsOptional()
    room_reservation_id?: number;

    @IsString()
    @IsOptional()
    special_req_preference?: string;

    @IsBoolean()
    vip_access: boolean = false;

    @IsNumber()
    @IsOptional()
    feedback_id?: number;

    @IsString()
    @IsOptional()
    room_updated?: string;
}
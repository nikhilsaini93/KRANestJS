import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateRoomMngDto {
    @IsOptional()
    @IsString()
    room_status_cleaning?: string;

    @IsOptional()
    @IsNumber()
    housekeeping_task_assign_id?: number;

    @IsOptional()
    @IsString()
    room_inspection?: string;

    @IsOptional()
    @IsBoolean()
    is_Occupied?: boolean;

    @IsOptional()
    @IsNumber()
    assigned_guest_id?: number;
}
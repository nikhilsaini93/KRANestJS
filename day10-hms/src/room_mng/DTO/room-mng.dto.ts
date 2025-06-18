import { IsString, IsNumber, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class CreateRoomMngDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['clean', 'dirty', 'in-progress'])
    room_status_cleaning: string;

    @IsOptional()
    @IsNumber()
    housekeeping_task_id?: number;

    @IsString()
    @IsNotEmpty()
    @IsIn(['passed', 'failed', 'pending'])
    room_inspection: string;

    @IsNumber()
    @IsOptional()
    assigned_guest_id?: number;
}
import { IsString, IsNotEmpty, IsDateString, IsNumber, Matches } from 'class-validator';

export class CreateStaffShiftDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Shift start time must be in HH:mm format (24-hour)'
    })
    shift_start: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Shift end time must be in HH:mm format (24-hour)'
    })
    shift_end: string;

    @IsDateString()
    @IsNotEmpty()
    shift_date: Date;

    @IsNumber()
    @IsNotEmpty()
    staff_id: number;
}
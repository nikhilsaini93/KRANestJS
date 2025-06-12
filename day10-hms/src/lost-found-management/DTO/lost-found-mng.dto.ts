

import { IsString, IsNotEmpty, IsNumber, IsDate, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLostFoundDto {
    @IsNumber()
    @IsNotEmpty()
    room_id: number;

    @IsString()
    @IsNotEmpty()
    item_description: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    date_found: Date;

    @IsString()
    @IsNotEmpty()
    @IsIn(['found', 'returned', 'unclaimed'])
    status: string;
}
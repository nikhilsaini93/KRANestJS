import { IsNumber, IsArray, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRoomServiceDto {
    @IsNumber()
    @IsNotEmpty()
    guest_id: number;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    staff_ids: number[];

    @IsNumber()
    @IsNotEmpty()
    table_id: number;

    @IsNumber()
    @IsNotEmpty()
    menu_id: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    total_bill: number;
}
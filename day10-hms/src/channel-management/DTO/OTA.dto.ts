import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChannelManagementDto {
    @IsNumber()
    @IsNotEmpty()
    customerId : number;

    @IsString()
    @IsNotEmpty()
    ota: string;

    @IsString()
    @IsNotEmpty()
    room_type: string;

    @IsBoolean()
    isavailability: boolean = true;

    @IsNotEmpty()
    @Type(() => Date)
    date: string;

    @IsString()
    amenities?: string;

    @IsNumber()
    @IsNotEmpty()
    total_bill: number;

    @IsNumber()
    @IsNotEmpty()
    paymentId: number;
}
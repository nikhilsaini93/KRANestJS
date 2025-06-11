import { IsString, IsNumber, IsNotEmpty, Min, IsEnum } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    payment_type: string;

    @IsEnum(['full', 'partial'])
    @IsNotEmpty()
    full_or_partial: string;

    @IsNumber()
    @Min(0)
    advance_payment: number;

    @IsString()
    @IsNotEmpty()
    status: string = 'pending';

    @IsNumber()
    @Min(0)
    refund: number = 0;

    @IsNotEmpty()
    payment_date: string;
}
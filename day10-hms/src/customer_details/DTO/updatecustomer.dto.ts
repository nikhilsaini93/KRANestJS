import { IsString, IsEmail, IsOptional, IsNumber, Length } from 'class-validator';

export class UpdateCustomerDto {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @Length(10, 10)
    phone?: string;

    @IsOptional()
    @IsString()
    dob?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    city?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    state?: string;

    @IsOptional()
    @IsNumber()
    pincode?: number;

    @IsOptional()
    @IsString()
    @Length(1, 20)
    customer_status?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    id_type?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    id_number?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    updated_at?: string;

    
}
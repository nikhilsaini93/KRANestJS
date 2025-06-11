import { IsString, IsEmail, IsOptional, IsNumber, Length, IsDate } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @Length(1, 100)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(10, 10)
    phone: string;

    @IsOptional()
    @IsString()
    dob?: string;

  
    @IsString()
    @Length(1, 100)
    city: string;

    
    @IsString()
    @Length(1, 100)
    state: string;

    
    @IsNumber()
    pincode: number;

    
    @IsString()
    @Length(1, 20)
    customer_status: string = 'active';

    
    @IsString()
    @Length(1, 50)
    id_type: string;

   
    @IsString()
    @Length(1, 50)
    id_number: string;
}
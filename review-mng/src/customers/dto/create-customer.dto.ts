import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Full name of the customer',
    example: 'Nik',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email address of the customer',
    example: 'nik@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for customer account (minimum 6 characters)',
    example: 'securePass123',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

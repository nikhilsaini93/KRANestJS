import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address used for login',
    example: 'support@greenplanet.com',
  })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({
    description: 'Password used for login (8–50 characters)',
    example: 'farmfresh2023',
    minLength: 8,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @MaxLength(50, { message: 'password must be at most 50 characters long' })
  password: string;

  @ApiProperty({
    description: 'Login type, must be either "customer" or "business"',
    example: 'business',
    enum: ['customer', 'business'],
  })
  @IsIn(['customer', 'business'], {
    message: 'type must be either "customer" or "business"',
  })
  type: 'customer' | 'business';
}

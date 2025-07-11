// dto/create-business.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateBussinessDto {
  @ApiProperty({
    description: 'Name of the business',
    example: 'Nik Store',
  })
  @IsString()
  @IsNotEmpty()
  bussiness_name: string;

  @ApiProperty({
    description: 'Password for the business account (minimum 6 characters)',
    example: 'BusinessPass123',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Business contact email address',
    example: 'nikstore@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Physical address of the business',
    example: '123 Main St, Springfield',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}

import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Invalid email address' })
    email  : string


  
    @IsNotEmpty({ message: 'password is required' })
    @IsString({ message: 'password must be a string' })
    @MinLength(8, { message: 'password must be at least 8 characters long' })
    @MaxLength(50, { message: 'password must be at most 50 characters long' })
    password: string
}
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail({}, { message: 'Invalid email address' })
    email  : string


    @IsNotEmpty({ message: 'name is required' })
    @IsString({ message: 'name must be a string' })
    @MinLength(3, { message: 'name must be at least 3 characters long' })
    @MaxLength(20, { message: 'name must be at most 20 characters long' })
    name   : string

    @IsNotEmpty({ message: 'password is required' })
    @IsString({ message: 'password must be a string' })
    @MinLength(8, { message: 'password must be at least 8 characters long' })

    @MaxLength(50, { message: 'password must be at most 50 characters long' })
    password: string
}
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

// export enum UserRole {
//   ADMIN = 'admin',
//   STAFF = 'staff',
//   MANAGER = 'manager'
// }

export class CreateUserAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

 
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  staff_id: number;
}
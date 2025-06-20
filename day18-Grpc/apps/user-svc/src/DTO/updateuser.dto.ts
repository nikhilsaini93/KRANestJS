import { IsString, IsEmail, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

import { IsBoolean, IsNumber, IsString } from "class-validator";


export class UserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  role: string;
  @IsBoolean()
  isActive?: boolean; // 
  
}

  

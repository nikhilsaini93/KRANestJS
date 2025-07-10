// dto/create-business.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBussinessDto {

  @IsString()
  @IsNotEmpty()
  bussiness_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

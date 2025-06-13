import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateSupplierDto{

@IsString()
@IsNotEmpty()
company_name : string;

@IsString()
@IsNotEmpty()
city : string;

@IsNumber()
@IsNotEmpty()
phone : number;

@IsEmail()
@IsNotEmpty()
email : string;

}


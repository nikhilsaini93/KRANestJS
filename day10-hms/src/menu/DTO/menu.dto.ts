import { IsNumber, IsString } from "class-validator";


export class CreateMenuDto{


    @IsString()
    description: string;
    @IsString()
    menu_type: string;
    @IsNumber()
    price: number;



}
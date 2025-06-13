import { IsDateString, IsNumber, IsString, IsTimeZone } from "class-validator";

export class CreateKtoDto{

   

    @IsDateString()
    order_time : string

    @IsNumber()
    servings : number 

    @IsNumber()
    room_service_id : number

    


}
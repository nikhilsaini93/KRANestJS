import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateServiceDto{
    @IsNumber()
    @IsNotEmpty()
    guest_id: number;
      
    @IsString()
    @IsNotEmpty()
    service_type: string;

    @IsString()
    @IsNotEmpty()
    description: string;
     
     @IsString()
    @IsNotEmpty()
    @IsIn(['pending', 'in-progress', 'completed', 'cancelled'])
    status: string;
}


 

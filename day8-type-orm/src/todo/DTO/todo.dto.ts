import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class TodoDto{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    isCompleted: boolean;
    
    @IsString()
    priority: string;

    


   

}
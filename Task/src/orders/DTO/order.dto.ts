import { IsNumber, IsString } from "class-validator";


export class OrderDto {
    @IsString()
    orderId: string;
    @IsString()
    userId: string;
    @IsNumber()
    amount: number;
    status?: string;
}
   
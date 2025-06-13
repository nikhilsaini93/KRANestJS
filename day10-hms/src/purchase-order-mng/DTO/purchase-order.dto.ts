import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class CratePurchaseOrderDto{
    @IsNumber()
    @IsOptional()
    supplier_id?: number;

    @IsNumber()
    @IsOptional()
    item_id?: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsDateString()
    @IsOptional()
    order_date?: Date;

}
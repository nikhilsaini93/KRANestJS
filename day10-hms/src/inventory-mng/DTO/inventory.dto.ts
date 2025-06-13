import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateInventoryDto{
    @IsString()
    @IsOptional()
    inventory_type?: string;

    @IsNumber()
    @IsOptional()
    supplier_id?: number;

    @IsNumber()
    @IsOptional()
    quantity_in_stock?: number;

    @IsDateString()
    @IsOptional()
    reorder_date?: Date;

    @IsDateString()
    @IsOptional()
    expiry_inventory?: Date;

    @IsNumber()
    @IsOptional()
    purchase_order_id?: number;

}



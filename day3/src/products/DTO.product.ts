import { IsString, IsNumber, IsOptional, IsUrl, IsEnum, Min, Max, Length } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @Length(5, 100)  // Enforcing a minimum length of 5 and maximum of 100
    title: string;

    @IsNumber()
    @Min(0)  // Price cannot be negative
    price: number;

    @IsString()
    @Length(10, 300)  // Enforcing a minimum length of 10 and maximum of 300 for description
    description: string;

    @IsString()
    @IsEnum(['men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing'])
    category: string;

    @IsUrl()
    image: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    rating?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    count?: number;
}



export class UpdateProductDto {
    @IsOptional() // This field is optional for updating
    @IsString()
    @Length(5, 100)
    title?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    @Length(10, 300)
    description?: string;

    @IsOptional()
    @IsString()
    @IsEnum(['men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing'])
    category?: string;

    @IsOptional()
    @IsUrl()
    image?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    rating?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    count?: number;
}
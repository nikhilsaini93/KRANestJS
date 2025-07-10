import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsNumber()
  customer_id: number;

  @IsNumber()
  @IsNotEmpty()
  business_id: number;
}

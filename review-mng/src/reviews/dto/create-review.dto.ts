import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Rating of the review from 1 to 5',
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({
    description: 'Optional comment for the review',
    example: 'Great service and friendly staff!',
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: 'Source of the review (e.g., "web", "mobile_app", "admin")',
    example: 'web',
  })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({
    description: 'ID of the customer who wrote the review',
    example: 4,
  })
  @IsNumber()
  customer_id: number;

  @ApiProperty({
    description: 'ID of the business being reviewed',
    example: 7,
  })
  @IsNumber()
  @IsNotEmpty()
  business_id: number;
}

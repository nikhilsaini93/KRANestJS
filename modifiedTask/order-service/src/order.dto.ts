// dto/order.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class OrderDto {
  @IsString()
  orderId: string;

  @IsString()
  userId: string;

  @IsNumber()
  amount: number;
}

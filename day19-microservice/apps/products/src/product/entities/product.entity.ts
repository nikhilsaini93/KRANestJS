import { IsInt, IsString, IsNumber, Min, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(2)
  @Column()
  name: string;

  @IsString()
   @Column()
  description: string;

  @IsNumber()
  @Min(0)
   @Column()
  price: number;

  @IsInt()
  @Min(0)
   @Column()
  stock: number;
}   
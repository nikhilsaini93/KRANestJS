import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { Semester } from '../entities/mark.entity';

export class CreateMarkDto {
  @IsNumber()
  @IsNotEmpty()
  studentDetailId: number;

  @IsNumber()
  @IsNotEmpty()
  subjectId: number;

  @IsEnum(Semester)
  semester: Semester;

  @IsNumber()
  @Min(0)
  @Max(100)
  marks: number;
}
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStudentDetailDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsOptional()
  teacherId?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  subjectIds?: number[];
}
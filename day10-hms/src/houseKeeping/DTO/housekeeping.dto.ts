import { IsEnum, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { TaskType, TaskStatus } from '../enitity/houseKeeping.entity';

export class CreateHousekeepingTaskDto {
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @IsEnum(TaskType)
  @IsNotEmpty()
  task_type: TaskType;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsNumber()
  @IsNotEmpty()
  assigned_staff_id: number;

  @IsDateString()
  @IsNotEmpty()
  scheduled_date: Date;
}
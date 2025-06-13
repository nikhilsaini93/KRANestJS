import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, IsNumber } from 'class-validator';

export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export enum TaskType {
    HOUSEKEEPING = 'housekeeping',
    MAINTENANCE = 'maintenance',
    ROOM_SERVICE = 'room_service',
    FRONT_DESK = 'front_desk',
    SECURITY = 'security'
}

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(TaskType)
    task_type: TaskType;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus = TaskStatus.PENDING;

    @IsArray()
    @IsOptional()
    staff_ids: number[];
}
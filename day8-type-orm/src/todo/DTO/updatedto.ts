import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class updateTodoDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    priority?: string;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}

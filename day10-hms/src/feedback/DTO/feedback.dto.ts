import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateFeedbackDto {
    @IsNumber()
    @IsNotEmpty()
    guest_id: number;

    @IsString()
    @IsNotEmpty()
    feedback_type: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    suggestion: string;
}
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './DTO/feedback.dto';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) { }


    @Get()
    async findall() {
     return await this.feedbackService.findall();

    }

    @Get(":id")
    async findById(@Param("id") id: number) {
        return await this.feedbackService.findById(+id)
    }


    @Post()
    async createfeedback(@Body() createfeedbackDto: CreateFeedbackDto) {
        return await this.feedbackService.createfeedback(createfeedbackDto)
    }
}

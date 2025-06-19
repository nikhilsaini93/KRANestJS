import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './DTO/feedback.dto';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { Roles } from 'src/auth/Decorators/roles.decorators';
import { Role } from 'src/user-accounts/enitity/user-account.entity';

@Controller('feedback')
@UseGuards(jwtAuthGuards, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
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

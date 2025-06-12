import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './enitity/feedback.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './DTO/feedback.dto';

@Injectable()
export class FeedbackService {

    constructor(@InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>){}
    async findall(){
        return await this.feedbackRepository.find();
    }

    async findById(id: number){
        return await this.feedbackRepository.findOne({where:{feedback_id: id}});
    }


    async createfeedback(createfeedbackDto: CreateFeedbackDto){
        const newfeedback = this.feedbackRepository.create({
            guest_id: createfeedbackDto.guest_id,
            feedback_type: createfeedbackDto.feedback_type,
            description: createfeedbackDto.description,
            rating: createfeedbackDto.rating,
            suggestion: createfeedbackDto.suggestion
        })
        return await this.feedbackRepository.save(newfeedback)

    }


}

import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SentimentAnalyzerService } from './review analyzer/review-analyzer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), AuthModule],
  controllers: [ReviewsController],
  providers: [ReviewsService ,SentimentAnalyzerService ],
})
export class ReviewsModule {}

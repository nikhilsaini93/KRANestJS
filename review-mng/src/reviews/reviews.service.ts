import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { SentimentAnalyzerService } from './review analyzer/review-analyzer';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);
 

  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly sentimentAnalyzerService: SentimentAnalyzerService,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      customer_id: createReviewDto.customer_id,
      business_id: createReviewDto.business_id,
    });
    await this.reviewRepository.save(review);
    return {
      success: true,
      message: 'Review Created',
    };
  }

  async findAll() {
    const res = await this.reviewRepository.find({
      relations: {
        customer: true,
        business: true,
      },
    });
    return {
      success: true,
      data: res,
    };
  }

  async findOne(id: number) {
    try {
      const res = await this.reviewRepository.findOne({
        where: {
          id,
        },
        relations: {
          customer: true,
          business: true,
        },
      });
      if (!res) {
        throw new NotFoundException('Review Not Found');
      }

      return res;
    } catch (error) {
      throw new Error('Error getting review by id ', error);
    }
  }
  async getReviewByBussinessId(bussId: number) {
    try {
      const reviews = await this.reviewRepository.find({
        where: {
          business_id: bussId,
        },
      });
      if (reviews.length === 0) {
        throw new NotFoundException('Review Not Found');
      }
      return {
        success: true,
        data: reviews,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const findreview = this.findOne(id);
      if (!findreview) {
        throw new NotFoundException('Review Not Found');
      }
      await this.reviewRepository.update(id, updateReviewDto);
      return {
        success: true,
        message: 'Review Updated',
      };
    } catch (error) {
      return {
        sucess: false,
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const findreview = this.findOne(id);
      if (!findreview) {
        throw new NotFoundException('Review Not Found');
      }
      await this.reviewRepository.delete(id);
      return {
        success: true,
        message: 'Review Deleted',
      };
    } catch (error) {
      console.log('Error delting review', error);
      return {
        sucess: false,
        error: error.message,
      };
    }
  }

  // async stats(businessId: number) {
  //   try {
  //     const stats = await this.reviewRepository
  //       .createQueryBuilder('review')
  //       .select('AVG(review.rating)', 'averageRating')
  //       .addSelect('COUNT(review.id)', 'totalCount')
  //       .where('review.business_id = :businessId', { businessId })
  //       .getRawOne();

  //     return {
  //       averageRating: parseFloat(stats.averageRating).toFixed(2),
  //       totalCount: parseInt(stats.totalCount),
  //     };
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Failed to fetch review statistics',
  //     );
  //   }
  // }

  // private async analyzeSentiment(text: string): Promise<'Good' | 'Bad'> {
  //     try {
  //       const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;

  //       const payload = {
  //         contents: [
  //           {
  //             parts: [
  //               {
  //                 text: `Classify the following review as "Good" or "Bad". Only respond with one word: Good or Bad.\n\nReview: "${text}"`,
  //               },
  //             ],
  //           },
  //         ],
  //       };

  //       const response = await fetch(url, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(payload),
  //       });

  //       const data = await response.json();
  //       console.log(data)

  //       const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  //       if (rawText === 'Good') return 'Good';
  //       return 'Bad'; // Default fallback

  //     } catch (error) {
  //       this.logger.error('Sentiment analysis failed', error);
  //       return 'Bad'; // Fallback if Gemini fails
  //     }
  //   }

    async stats(businessId: number) {
      try {
        const stats = await this.reviewRepository
          .createQueryBuilder('review')
          .select('AVG(review.rating)', 'averageRating')
          .addSelect('COUNT(review.id)', 'totalCount')
          .where('review.business_id = :businessId', { businessId })
          .getRawOne();

        const reviews = await this.reviewRepository.find({
          where: { business: { id: businessId } },
        });

        let goodCount = 0;
        let badCount = 0;

        for (const review of reviews) {
          const sentiment = await this.sentimentAnalyzerService.analyzeSentiment(review.comment);
          if (sentiment === 'Good') goodCount++;
          else badCount++;
        }

        return {
          averageRating: parseFloat(stats.averageRating || '0').toFixed(2),
          totalCount: parseInt(stats.totalCount || '0'),
          goodReviews: goodCount,
          badReviews: badCount,
        };
      } catch (error) {
        this.logger.error('Failed to fetch review statistics with sentiment', error);
        throw new InternalServerErrorException({
          message: 'Failed to fetch review statistics with sentiment',
          reason: error.message,
        });
      }
    }
}

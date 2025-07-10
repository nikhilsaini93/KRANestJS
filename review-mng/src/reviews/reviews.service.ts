import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
constructor(@InjectRepository(Review) private readonly reviewRepository: Repository<Review>){}

  async create(createReviewDto: CreateReviewDto){
    const review =  this.reviewRepository.create({
      ...createReviewDto,
      customer_id : createReviewDto.customer_id,
      business_id : createReviewDto.business_id,
    });
    await this.reviewRepository.save(review);
    return{
      success: true,
      message: "Review Created"
    }
  }

   async findAll() {
   const res =  await this.reviewRepository.find({
      relations:{
        customer : true,
        business : true
      }
    })
    return {
      success : true,
      data : res
    }
    
  }

  async findOne(id: number) {
    try {
      const res = await this.reviewRepository.findOne({
        where : {
          id
        },
        relations:{
          customer : true,
          business : true
        }
      })
      if(!res){
        throw new NotFoundException("Review Not Found")
      }

      return res
    } catch (error) {
      throw new Error("Error getting review by id ", error)
      
    }
  }
  async getReviewByBussinessId(bussId : number){
    try {
      const reviews = await this.reviewRepository.find({
      where : {
        business_id : bussId
      },
    
    })
    if (reviews.length === 0)
{
      throw new NotFoundException("Review Not Found")
    }
    return {
      success : true,
      data : reviews,
    }
    } catch (error) {
      return {
      success : false,
      error : error.message
     }
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const findreview = this.findOne(id)
    if(!findreview){
      throw new NotFoundException("Review Not Found")
    }
    await this.reviewRepository.update(id,updateReviewDto)
    return{
      success: true,
      message: "Review Updated"
    }
      
    } catch (error) {
     return {
      sucess : false,
      error : error.message
     }
      
    }

  }

  async remove(id: number) {
    try {
          const findreview = this.findOne(id)
    if(!findreview) {
      throw new NotFoundException("Review Not Found")
    
    }
    await this.reviewRepository.delete(id)
    return{
      success: true,
      message: "Review Deleted"
    }
    } catch (error) {
      console.log("Error delting review" , error)
       return {
      sucess : false,
      error : error.message
     }
      
    }


  }
}

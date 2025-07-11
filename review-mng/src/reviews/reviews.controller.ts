import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { jwtAuthGuards } from 'src/auth/guards/auth.guard';
import { UserTypeGuard } from 'src/auth/guards/user-type.guard';
import { UserType } from 'src/auth/decorators/user-type.decorator';

@ApiTags('Reviews') // Groups endpoints under "Reviews" in Swagger UI
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // @ApiBearerAuth()
  @UseGuards(jwtAuthGuards, UserTypeGuard)
  @UserType('customer')
  @ApiOperation({ summary: 'Create a new review' })
  @ApiCreatedResponse({ description: 'Review successfully created' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }


  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all reviews' })
  @ApiOkResponse({
    description: 'List of all reviews',
    type: CreateReviewDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  @UseGuards(jwtAuthGuards, UserTypeGuard)
  @UserType('customer')
  findAll() {
    return this.reviewsService.findAll();
  }

 

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific review by ID' })
  @ApiOkResponse({ description: 'Review retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Invalid review ID' })
  @UseGuards(jwtAuthGuards, UserTypeGuard)
  @UserType('business')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  // @ApiBearerAuth()
  @UseGuards(jwtAuthGuards, UserTypeGuard)
  @UserType('customer')
  @ApiOperation({ summary: 'Update an existing review' })
  @ApiOkResponse({ description: 'Review updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid update data or review ID' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  // @ApiBearerAuth()
  @UseGuards(jwtAuthGuards, UserTypeGuard)
  @UserType('customer')
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiOkResponse({ description: 'Review deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid review ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  
  }


  //  @ApiBearerAuth()
  @UseGuards(jwtAuthGuards, UserTypeGuard)
  @UserType('business')
  @ApiOperation({ summary: 'Get reviews for a specific business by ID' })
  @ApiOkResponse({ description: 'Business reviews retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Invalid business ID' })
  @Get('business/:businessId')
  getReviewByBusinessId(@Param('businessId') businessId: number) {
    return this.reviewsService.getReviewByBussinessId(businessId);
  }



  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Get review statistics for a business' })
  @ApiOkResponse({ description: 'Review statistics retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Invalid business ID' })
  @UseGuards(jwtAuthGuards, UserTypeGuard)
  @UserType('business')
  @Get('stats/:businessId')
  stats(@Param('businessId') businessId: number) {
    return this.reviewsService.stats(businessId);
  }
}

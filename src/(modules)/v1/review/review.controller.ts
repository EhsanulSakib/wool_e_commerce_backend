import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}

  @Get('single-review')
  getSingleReview(
    @Query('uid') uid?: number,
  ) {
    return this.reviewService.getSingleReview(uid);
  }

  @Get('multiple-reviews')
  getMultipleReviews(
    @Query('product_uid') product_uid?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.reviewService.getMultipleReviews(product_uid, page, limit);
  }

  @Post('create-review')
  createReview(
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Put('update-review')
  updateReview(
    @Query('uid') uid: number,
    @Body() updateReviewDto: UpdateReviewDto, 
  ) {
    return this.reviewService.updateReview(uid, updateReviewDto);
  }

  @Delete('delete-review')
  deleteReview(
    @Query('uid') uid: number,
  ) {
    return this.reviewService.deleteReview(uid);
  }
}

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/schema/v1/review.schema';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  async getSingleReview(uid?: number) {
    try {
      if (!uid) {
        throw new BadRequestException('UID is required to fetch a review');
      }
      const review = await this.reviewModel.findOne({ uid }).exec();
      if (!review) {
        throw new NotFoundException("Review not found");
      }
      return review;
    }
    catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to fetch review');
    }
  }

async getMultipleReviews(product_uid?: number, page: number = 1, limit: number = 25) {
  try {
    const query: any = {};
    if (product_uid) {
      const productUidNum = Number(product_uid);
      if (isNaN(productUidNum)) {
        throw new BadRequestException('Product UID must be a valid number');
      }
      query.product_uid = productUidNum;
    }

    // Fetch reviews with pagination
    const reviews = await this.reviewModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    // Get total count
    const totalReviews = await this.reviewModel.countDocuments(query).exec();

    // Calculate average rating
    let averageRating = 0;
    if (totalReviews > 0) {
      const totalRatings = await this.reviewModel
        .find(query)
        .select('rating')
        .exec();
      
      const sumRating = totalRatings.reduce((acc, review) => acc + review.rating, 0);
      averageRating = Number((sumRating / totalRatings.length).toFixed(2));
      
      if (isNaN(averageRating)) {
        throw new InternalServerErrorException('Unable to calculate average rating');
      }
      if (averageRating < 0 || averageRating > 5) {
        throw new InternalServerErrorException('Average rating is out of bounds');
      }
    }

    // Return empty result if no reviews found
    if (!reviews || reviews.length === 0) {
      throw new NotFoundException('No reviews found for the specified product UID');
    }

    return {
      page,
      limit,
      totalReviews,
      averageRating,
      reviews,
    };
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw error;
    }
    throw new InternalServerErrorException(error.message || 'Unable to fetch reviews');
  }
}

  async createReview(createReviewDto: CreateReviewDto) {
    try {
      const newReview = new this.reviewModel(createReviewDto);
      await newReview.save();
      return { message: 'Review created successfully', review: newReview };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to create review');
    }
  }

  async updateReview(uid: number, updateReviewDto: UpdateReviewDto) {
    try {
      const updatedReview = await this.reviewModel.findOneAndUpdate(
        { uid },
        updateReviewDto,
        { new: true },
      );
      if (!updatedReview) {
        throw new NotFoundException('Review not found');
      }
      return { message: 'Review updated successfully', review: updatedReview };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to update review');
    }
  }

  async deleteReview(uid: number) {
    try {
      const deletedReview = await this.reviewModel.findOneAndDelete({ uid: Number(uid) });
      if (!deletedReview) {
        throw new NotFoundException('Review not found');
      }
      return { message: 'Review deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to delete review');
    }
  }

}

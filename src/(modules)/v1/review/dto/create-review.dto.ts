import { IsNumber, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  product_uid: number;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
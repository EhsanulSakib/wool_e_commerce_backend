import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from 'src/types/v1/products.type';

export class ProductDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  attribute_uid: number;

  @IsNotEmpty()
  @IsNumber()
  variant_uid: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailsDto)
  product_details: ProductDetailsDto[];

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
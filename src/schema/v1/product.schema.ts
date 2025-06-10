import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductStatus } from 'src/types/v1/products.type';
import { generateId } from 'src/utils/v1/helper.utils';

@Schema()
export class ProductDetails {
  @Prop({ required: true })
  attribute_uid: number;

  @Prop({ required: true })
  variant_uid: number;
}

export const ProductDetailsSchema = SchemaFactory.createForClass(ProductDetails);

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, unique: true, default: generateId })
  uid: number;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, type: [String], validate: {
    validator: (images: string[]) => images.every(img => typeof img === 'string' && img.length > 0),
    message: 'Each image must be a non-empty string'
  } })
  images: string[];

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ type: [ProductDetailsSchema], required: true })
  product_details: ProductDetails[];

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: false, default: 0, min: 0 })
  discount?: number;

  @Prop({ required: true, min: 0 })
  quantity: number;

  @Prop({ enum: ProductStatus, default: ProductStatus.INSTOCK })
  status: ProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
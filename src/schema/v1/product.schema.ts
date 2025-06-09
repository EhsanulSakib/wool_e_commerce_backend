import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ProductStatus } from 'src/types/v1/products.type';
import { generateId } from 'src/utils/v1/helper.utils';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, unique: true, default: generateId })
  uid: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  description: string;

  @Prop({required: true})
  product_details: object;

  @Prop({ required: true })
  price: number;

  @Prop({required: false, default: 0})
  discount?: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ enum: ProductStatus, default: ProductStatus.INSTOCK })
  status: ProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

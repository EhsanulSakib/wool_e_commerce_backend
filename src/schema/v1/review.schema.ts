import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { generateId } from "src/utils/v1/helper.utils";

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true, unique: true, default: generateId })
  uid: number;

  @Prop({ required: true })
  product_uid: number;

  @Prop({ required: true })
  user_name: number;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
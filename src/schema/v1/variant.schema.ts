import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { VariantStatus } from 'src/types/v1/variant.type';
import { generateId } from 'src/utils/v1/helper.utils';

@Schema({ timestamps: true })
export class Variant extends Document {
  @Prop({
    required: true,
    unique: true,
    default: generateId,
  })
  uid: number;

  @Prop({ required: true})
  attribute_uid: number;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: VariantStatus.ACTIVE })
  status: VariantStatus;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
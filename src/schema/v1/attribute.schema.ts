import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AttributeStatus } from 'src/types/v1/attribute.type';
import { generateId } from 'src/utils/v1/helper.utils';

@Schema({ timestamps: true })
export class Attribute extends Document {
  @Prop({
    required: true,
    unique: true,
    default: generateId,
  })
  uid: number;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: AttributeStatus.ACTIVE })
  status: AttributeStatus;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
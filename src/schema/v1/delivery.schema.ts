import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DeliveryStatus } from "src/types/v1/delivery.type";
import { generateId } from "src/utils/v1/helper.utils";

@Schema({timestamps: true})
export class Delivery extends Document {
  @Prop({ required: true, unique: true, default: generateId })
  uid: number;

  @Prop({ required: true })
  order_uid: number;

  @Prop({ required: true })
  tracking_number: string;

  @Prop({ required: true })
  delivery_date: string;

  @Prop({ required: false })
  delivered_at?: string;

  @Prop({ required: true })
  delivery_address_line: string;

  @Prop({ required: true })
  delivery_city: string;

  @Prop({ required: true })
  delivery_state: string;

  @Prop({ required: true })
  delivery_country: string;

  @Prop({ required: true })
  delivery_postal_code: number;

  @Prop({ required: true })
  delivery_man_name: string;

  @Prop({ required: true })
  delivery_man_phone: string;

  @Prop({ required: false })
  note: string;

  @Prop({ required: true })
  status: DeliveryStatus;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
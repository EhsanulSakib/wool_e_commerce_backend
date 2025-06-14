import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { OrderStatus, PaymentMethod, PaymentStatus } from 'src/types/v1/order.type';
import { generateId } from 'src/utils/v1/helper.utils';

@Schema()
export class Products {
  @Prop({ required: true })
  product_uid: number;

  @Prop({ required: true })
  quantity: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);

@Schema()
export class PaymentDetails {
  @Prop({ required: true })
  method: PaymentMethod;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: false })
  transactionId?: string;

  @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
  payment_status: PaymentStatus;
}

export const PaymentDetailsSchema = SchemaFactory.createForClass(PaymentDetails);

@Schema()
export class AddressDetails {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  postal_code: number;

  @Prop({ required: true })
  address_line: string;
}

export const AddressDetailsSchema = SchemaFactory.createForClass(AddressDetails);

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({
    unique: true,
    index: true,
    default: generateId,
  })
  uid: number;

  @Prop({ required: true })
  cid: number;

  @Prop({ type: [ProductsSchema], required: true })
  products: Products[];

  @Prop({ type: AddressDetailsSchema, required: true })
  address_details: AddressDetails;

  @Prop({ type: PaymentDetailsSchema, required: false })
  payment_details?: PaymentDetails;

  @Prop({ required: true, default: Date.now })
  order_date: string;

  @Prop({ required: false })
  delivery_date?: string;

  @Prop({ enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
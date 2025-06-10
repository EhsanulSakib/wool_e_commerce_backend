import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from 'src/types/v1/order.type';

export class ProductsDto {
  @IsNotEmpty()
  @IsNumber()
  product_uid: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class PaymentDetailsDto {
  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  payment_status?: string;
}

export class AddressDetailsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  postal_code: number;

  @IsNotEmpty()
  @IsString()
  address_line: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  cid: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductsDto)
  products: ProductsDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDetailsDto)
  address_details: AddressDetailsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  payment_details?: PaymentDetailsDto;

  @IsNotEmpty()
  @IsString()
  order_date: string;

  @IsOptional()
  @IsString()
  delivery_date?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
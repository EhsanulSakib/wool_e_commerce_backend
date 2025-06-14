import { IsNumber, IsString, IsNotEmpty, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { DeliveryStatus } from 'src/types/v1/delivery.type';

export class CreateDeliveryDto {
  @IsNumber()
  @IsNotEmpty()
  order_uid: number;

  @IsString()
  @IsNotEmpty()
  tracking_number: string;

  @IsString()
  @IsNotEmpty()
  delivery_date: string;

  @IsString()
  @IsOptional()
  delivered_at: string;

  @IsString()
  @IsNotEmpty()
  delivery_address_line: string;

  @IsString()
  @IsNotEmpty()
  delivery_city: string;

  @IsString()
  @IsNotEmpty()
  delivery_state: string;

  @IsString()
  @IsNotEmpty()
  delivery_country: string;

  @IsNumber()
  @IsNotEmpty()
  delivery_postal_code: number;

  @IsString()
  @IsNotEmpty()
  delivery_man_name: string;

  @IsString()
  @IsNotEmpty()
  delivery_man_phone: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsEnum(DeliveryStatus)
  @IsNotEmpty()
  status: DeliveryStatus;
}
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { VariantStatus } from 'src/types/v1/variant.type';

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  attribute_uid: number;

  @IsEnum(VariantStatus)
  @IsNotEmpty()
  status: string;
}
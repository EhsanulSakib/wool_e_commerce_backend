import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AttributeStatus } from 'src/types/v1/attribute.type';

export class CreateAttributeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(AttributeStatus)
  @IsNotEmpty()
  status: string;
}
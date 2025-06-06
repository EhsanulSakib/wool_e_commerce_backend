
import { CreateAttributeDto } from './create-attribute.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {}
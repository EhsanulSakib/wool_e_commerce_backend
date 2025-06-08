import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Variant, VariantSchema } from 'src/schema/v1/variant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Variant.name,
        schema: VariantSchema,
      },
    ]),
  ],
  providers: [VariantService],
  controllers: [VariantController],
})
export class VariantModule {}

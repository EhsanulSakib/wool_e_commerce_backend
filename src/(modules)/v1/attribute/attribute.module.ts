import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attribute, AttributeSchema } from 'src/schema/v1/attribute.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attribute.name,
        schema: AttributeSchema,
      },
    ]),
  ],
  providers: [AttributeService],
  controllers: [AttributeController],
})
export class AttributeModule {}

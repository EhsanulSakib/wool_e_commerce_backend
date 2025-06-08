import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant } from 'src/schema/v1/variant.schema';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantService {
  constructor(@InjectModel(Variant.name) private variantModel: Model<Variant>) {}

  async getSingleVariant(uid: number) {
    try {
      const variant = await this.variantModel.findOne({ uid }).exec();
      if (!variant) {
        throw new NotFoundException('Variant not found');
      }
      return variant;
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to fetch variant');
    }
  }

  async getMultipleVariants(status: string, page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const [variants, total] = await Promise.all([
        this.variantModel.find({ status }).skip(skip).limit(limit).exec(),
        this.variantModel.countDocuments({ status }).exec(),
      ]);
      return { status: true, variants, total };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to fetch variants');
    }
  }

  async getAllVariants(status: string) {
    try {
      const variants = await this.variantModel.find({ status }).exec();
      return { status: true, variants };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to fetch all variants');
    }
  }

  async createVariant(createVariantDto: CreateVariantDto) {
    try {
      const createdVariant = new this.variantModel(createVariantDto);
      await createdVariant.save();

      return { status: true, message: 'Variant created successfully', variant: createdVariant };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to create variant');
    }
  }

  async updateVariant(uid: number, updateVariantDto: UpdateVariantDto) {
    try {
      const updatedVariant = await this.variantModel
        .findOneAndUpdate({ uid }, { $set: updateVariantDto }, { new: true })
        .exec();
      if (!updatedVariant) {
        throw new NotFoundException('Variant not found');
      }
      return { status: true, message: 'Variant updated successfully', variant: updatedVariant };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to update variant');
    }
  }

  async deleteVariant(uid: number) {
    try {
      const deletedVariant = await this.variantModel.findOneAndDelete({ uid }).exec();
      if (!deletedVariant) {
        throw new NotFoundException('Variant not found');
      }
      return { status: true, message: 'Variant deleted successfully', variant: deletedVariant };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Unable to delete variant');
    }
  }
}

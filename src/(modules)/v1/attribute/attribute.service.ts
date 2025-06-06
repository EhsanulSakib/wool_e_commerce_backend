import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attribute } from 'src/schema/v1/attribute.schema';

@Injectable()
export class AttributeService {
    constructor(@InjectModel(Attribute.name) private attributeModel: Model<Attribute>) {}

    async getSingleAttribute(uid: number) {
        try {
            const attribute = await this.attributeModel.findOne({ uid }).exec();
            if (!attribute) {
                throw new NotFoundException('Attribute not found');
            }
            return attribute;
        } catch (error) {
            throw new InternalServerErrorException(error.message || 'Unable to fetch attribute');
        }
    }

    async getMultipleAttributes(status: string, page: number, limit: number) {
        try {
            const skip = (page - 1) * limit;
            const [attributes, total] = await Promise.all([
                this.attributeModel.find({ status }).skip(skip).limit(limit).exec(),
                this.attributeModel.countDocuments({ status }).exec(),
            ]);
            return { status: true, attributes, total };
        } catch (error) {
            throw new InternalServerErrorException(error.message || 'Unable to fetch attributes');
        }
    }

    async createAttribute(createAttributeDto: any) {
        try {
            const createdAttribute = new this.attributeModel(createAttributeDto);
            await createdAttribute.save();

            return { status: true, message: 'Attribute created successfully', attribute: createdAttribute };
        } catch (error) {
            throw new InternalServerErrorException(error.message || 'Unable to create attribute');
        }
    }

    async updateAttribute(uid: number, updateAttributeDto: any) {
        try {
            const updatedAttribute = await this.attributeModel
                .findOneAndUpdate({ uid }, { $set: updateAttributeDto }, { new: true })
                .exec();
            if (!updatedAttribute) {
                throw new NotFoundException('Attribute not found');
            }
            return { status: true, message: 'Attribute updated successfully', attribute: updatedAttribute };
        } catch (error) {
            throw new InternalServerErrorException(error.message || 'Unable to update attribute');
        }
    }

    async deleteAttribute(uid: number) {
        try {
            const deletedAttribute = await this.attributeModel.findOneAndDelete({ uid }).exec();
            if (!deletedAttribute) {
                throw new NotFoundException('Attribute not found');
            }
            return { status: true, message: 'Attribute deleted successfully', attribute: deletedAttribute };
        } catch (error) {
            throw new InternalServerErrorException(error.message || 'Unable to delete attribute');
        }
    }
}

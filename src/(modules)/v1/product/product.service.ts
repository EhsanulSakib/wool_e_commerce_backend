import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schema/v1/product.schema';
import { ProductStatus } from 'src/types/v1/products.type';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async getSingleProduct(uid?: string, name?: string) {
    try {
      const query: any = {};
      if (uid) query.uid = uid;
      if (name) query.name = new RegExp(name, 'i'); // Case-insensitive search

      const product = await this.productModel.findOne(query).exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Unable to fetch product',
      );
    }
  }

  async getMultipleProducts(
    status?: string,
    page: number = 1,
    limit: number = 25,
    search: any = {},
  ): Promise<{ products: any[]; total: number }> {
    try {
      const query: any = {};

      // Handle status filter
      if (
        status &&
        Object.values(ProductStatus).includes(status as ProductStatus)
      ) {
        query.status = status;
      }

      // Handle search filters
      if (search.name) {
        query.name = { $regex: search.name, $options: 'i' };
      }
      if (search.min_price || search.max_price) {
        query.price = {};
        if (search.min_price) query.price.$gte = Number(search.min_price);
        if (search.max_price) query.price.$lte = Number(search.max_price);
      }
      if (search.status) {
        query.status = search.status;
      }

      // Calculate skip for pagination
      const skip = (page - 1) * limit;

      // Build aggregation pipeline
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'attributes',
            localField: 'product_details.attribute_uid',
            foreignField: 'uid',
            as: 'attribute_details',
          },
        },
        {
          $lookup: {
            from: 'variants',
            localField: 'product_details.variant_uid',
            foreignField: 'uid',
            as: 'variant_details',
          },
        },
        {
          $addFields: {
            product_details: {
              $map: {
                input: '$product_details',
                as: 'detail',
                in: {
                  attribute: {
                    $arrayElemAt: [
                      '$attribute_details',
                      {
                        $indexOfArray: [
                          '$attribute_details.uid',
                          '$$detail.attribute_uid',
                        ],
                      },
                    ],
                  },
                  variant: {
                    $arrayElemAt: [
                      '$variant_details',
                      {
                        $indexOfArray: [
                          '$variant_details.uid',
                          '$$detail.variant_uid',
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            attribute_details: 0,
            variant_details: 0,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ];

      // Execute aggregation for products
      const products = await this.productModel.aggregate(pipeline).exec();

      // Count total documents for pagination
      const total = await this.productModel.countDocuments(query).exec();

      // Handle variant_name search in a separate aggregation if provided
      if (search.variant_name) {
        const variantPipeline = [
          {
            $lookup: {
              from: 'variants',
              localField: 'product_details.variant_uid',
              foreignField: 'uid',
              as: 'variant_details',
            },
          },
          {
            $match: {
              'variant_details.name': {
                $regex: search.variant_name,
                $options: 'i',
              },
              ...query,
            },
          },
          {
            $lookup: {
              from: 'attributes',
              localField: 'product_details.attribute_uid',
              foreignField: 'uid',
              as: 'attribute_details',
            },
          },
          {
            $addFields: {
              product_details: {
                $map: {
                  input: '$product_details',
                  as: 'detail',
                  in: {
                    attribute: {
                      $arrayElemAt: [
                        '$attribute_details',
                        {
                          $indexOfArray: [
                            '$attribute_details.uid',
                            '$$detail.attribute_uid',
                          ],
                        },
                      ],
                    },
                    variant: {
                      $arrayElemAt: [
                        '$variant_details',
                        {
                          $indexOfArray: [
                            '$variant_details.uid',
                            '$$detail.variant_uid',
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          {
            $project: {
              attribute_details: 0,
              variant_details: 0,
            },
          },
          { $skip: skip },
          { $limit: limit },
        ];

        const variantFilteredProducts = await this.productModel
          .aggregate(variantPipeline)
          .exec();
        const variantTotal = await this.productModel
          .aggregate([
            {
              $lookup: {
                from: 'variants',
                localField: 'product_details.variant_uid',
                foreignField: 'uid',
                as: 'variant_details',
              },
            },
            {
              $match: {
                'variant_details.name': {
                  $regex: search.variant_name,
                  $options: 'i',
                },
                ...query,
              },
            },
          ])
          .count('total')
          .exec();

        return {
          products: variantFilteredProducts,
          total: variantTotal.length > 0 ? variantTotal[0].total : 0,
        };
      }

      return { products, total };
    } catch (error) {
      throw new Error(error.message || 'Unable to fetch products');
    }
  }

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const createdProduct = new this.productModel(createProductDto);
      await createdProduct.save();
      return {
        status: true,
        message: 'Product created successfully',
        product: createdProduct,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Unable to create product',
      );
    }
  }

  async updateProduct(uid: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel
        .findOneAndUpdate({ uid }, { $set: updateProductDto }, { new: true })
        .exec();
      if (!updatedProduct) {
        throw new NotFoundException('Product not found');
      }
      return {
        status: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Unable to update product',
      );
    }
  }

  async deleteProduct(uid: string) {
    try {
      const deletedProduct = await this.productModel.findOneAndDelete({
        uid,
      });
      if (!deletedProduct) {
        throw new NotFoundException('Product not found');
      }
      return {
        status: true,
        message: 'Product deleted successfully',
        product: deletedProduct,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Unable to delete product',
      );
    }
  }
}

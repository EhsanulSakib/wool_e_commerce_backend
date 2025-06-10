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

  async getSingleProduct(uid?: number, name?: string) {
    try {
      const matchStage: any = {};
      if (uid) matchStage.uid = uid;
      if (name) matchStage.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search

      const pipeline = [
        { $match: matchStage },
        {
          $lookup: {
            from: 'attributes', // Collection name for attributes
            localField: 'product_details.attribute_uid',
            foreignField: 'uid',
            as: 'attribute_details',
          },
        },
        {
          $lookup: {
            from: 'variants', // Collection name for variants
            localField: 'product_details.variant_uid',
            foreignField: 'uid',
            as: 'variant_details',
          },
        },
        {
          $project: {
            uid: 1,
            name: 1,
            images: 1,
            description: 1,
            product_details: 1,
            price: 1,
            discount: 1,
            quantity: 1,
            status: 1,
            attribute_details: 1,
            variant_details: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
        { $limit: 1 },
      ];

      const [product] = await this.productModel.aggregate(pipeline).exec();
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
      // Validate pagination parameters
      const pageNum = Math.max(
        1,
        Number.isNaN(Number(page)) ? 1 : Number(page),
      );
      const limitNum = Math.max(
        1,
        Number.isNaN(Number(limit)) ? 25 : Number(limit),
      );
      const skip = (pageNum - 1) * limitNum;

      // Build query object
      const query: any = {};

      // Handle status filter (prioritize query param over search object)
      if (
        status &&
        Object.values(ProductStatus).includes(status as ProductStatus)
      ) {
        query.status = status;
      } else if (
        search.status &&
        Object.values(ProductStatus).includes(search.status)
      ) {
        query.status = search.status;
      }

      // Handle search filters
      if (search.name) {
        query.name = { $regex: String(search.name), $options: 'i' };
      }
      if (search.min_price || search.max_price) {
        query.price = {};
        if (search.min_price) {
          const minPrice = Number(search.min_price);
          if (!Number.isNaN(minPrice) && minPrice >= 0) {
            query.price.$gte = minPrice;
          }
        }
        if (search.max_price) {
          const maxPrice = Number(search.max_price);
          if (!Number.isNaN(maxPrice) && maxPrice >= 0) {
            query.price.$lte = maxPrice;
          }
        }
        // Remove price filter if no valid bounds
        if (Object.keys(query.price).length === 0) delete query.price;
      }

      // Base aggregation pipeline
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
        { $limit: limitNum },
      ];

      // Execute aggregation for products
      const products = await this.productModel.aggregate(pipeline).exec();

      // Count total documents for pagination
      let total = await this.productModel.countDocuments(query).exec();

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
                $regex: String(search.variant_name),
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
          { $limit: limitNum },
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
                  $regex: String(search.variant_name),
                  $options: 'i',
                },
                ...query,
              },
            },
            { $count: 'total' },
          ])
          .exec();

        return {
          products: variantFilteredProducts,
          total: variantTotal.length > 0 ? variantTotal[0].total : 0,
        };
      }

      return { products, total };
    } catch (error) {
      throw new Error(
        `Failed to fetch products: ${error.message || 'Unknown error'}`,
      );
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

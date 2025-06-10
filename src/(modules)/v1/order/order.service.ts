import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schema/v1/order.schema';
import { OrderSearchParams, OrderStatus } from 'src/types/v1/order.type';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async getSingleOrder(uid: number) {
    try {
      const pipeline = [
        { $match: { uid } },
        {
          $unwind: { path: '$products' },
        },
        {
          $lookup: {
            from: 'products', // Collection name for products
            let: { productUid: '$products.product_uid' },
            pipeline: [
              { $match: { $expr: { $eq: ['$uid', '$$productUid'] } } },
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
            ],
            as: 'product_details',
          },
        },
        {
          $unwind: {
            path: '$product_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            uid: { $first: '$uid' },
            cid: { $first: '$cid' },
            products: {
              $push: {
                product_uid: '$products.product_uid',
                quantity: '$products.quantity',
                details: '$product_details',
              },
            },
            address_details: { $first: '$address_details' },
            payment_details: { $first: '$payment_details' },
            order_date: { $first: '$order_date' },
            delivery_date: { $first: '$delivery_date' },
            status: { $first: '$status' },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
      ];

      const [order] = await this.orderModel.aggregate(pipeline).exec();
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Unable to fetch order',
      );
    }
  }

  async getMultipleOrders(
    status?: string,
    page: number = 1,
    limit: number = 25,
    search: OrderSearchParams = {},
  ) {
    try {
      // Validate pagination parameters
      const pageNum = Number(page);
      const limitNum = Number(limit);
      if (!Number.isInteger(pageNum) || pageNum < 1) {
        throw new BadRequestException('Page must be a positive integer');
      }
      if (!Number.isInteger(limitNum) || limitNum < 1) {
        throw new BadRequestException('Limit must be a positive integer');
      }

      // Validate status
      if (
        status &&
        !Object.values(OrderStatus).includes(status as OrderStatus)
      ) {
        throw new BadRequestException(
          `Status must be one of: ${Object.values(OrderStatus).join(', ')}`,
        );
      }

      const matchStage: any = {};

      // Apply status filter if provided
      if (status) {
        matchStage.status = status;
      }

      // Apply search filters
      if (search.cid) {
        const cid = Number(search.cid);
        if (isNaN(cid)) {
          throw new BadRequestException(
            'Customer ID (cid) must be a valid number',
          );
        }
        matchStage.cid = cid;
      }
      if (search.order_date) {
        const orderDate = new Date(search.order_date);
        if (isNaN(orderDate.getTime())) {
          throw new BadRequestException('Order date must be a valid date');
        }
        matchStage.order_date = { $gte: orderDate.toISOString() };
      }
      if (search.delivery_date) {
        const deliveryDate = new Date(search.delivery_date);
        if (isNaN(deliveryDate.getTime())) {
          throw new BadRequestException('Delivery date must be a valid date');
        }
        matchStage.delivery_date = { $gte: deliveryDate.toISOString() };
      }
      if (search.city) {
        matchStage['address_details.city'] = {
          $regex: search.city,
          $options: 'i',
        }; // Case-insensitive search
      }

      // Pagination
      const skip = (pageNum - 1) * limitNum;

      // Aggregation pipeline
      const pipeline: import('mongoose').PipelineStage[] = [
        { $match: matchStage },
        {
          $unwind: {
            path: '$products',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'products', // Collection name for products
            let: { productUid: '$products.product_uid' },
            pipeline: [
              { $match: { $expr: { $eq: ['$uid', '$$productUid'] } } },
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
            ],
            as: 'product_details',
          },
        },
        {
          $unwind: {
            path: '$product_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            uid: { $first: '$uid' },
            cid: { $first: '$cid' },
            products: {
              $push: {
                product_uid: '$products.product_uid',
                quantity: '$products.quantity',
                details: '$product_details',
              },
            },
            address_details: { $first: '$address_details' },
            payment_details: { $first: '$payment_details' },
            order_date: { $first: '$order_date' },
            delivery_date: { $first: '$delivery_date' },
            status: { $first: '$status' },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
        { $sort: { order_date: -1 } }, // Sort by order date, newest first
        { $skip: skip },
        { $limit: limitNum },
      ];

      // Execute aggregation
      const orders = await this.orderModel.aggregate(pipeline).exec();

      // Get total count for pagination
      const countPipeline = [{ $match: matchStage }, { $count: 'total' }];
      const countResult = await this.orderModel.aggregate(countPipeline).exec();
      const total = countResult[0]?.total || 0;

      // Calculate pagination metadata
      const totalPages = Math.ceil(total / limitNum);

      if (!orders || orders.length === 0) {
        return {
          orders: [],
          pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages,
          },
        };
      }

      return {
        orders,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Unable to fetch orders',
      );
    }
  }

  async getUserOrders(cid: number, page: number = 1, limit: number = 25) {
    try {
      // Validate inputs
      const pageNum = Number(page);
      const limitNum = Number(limit);
      const cidNum = Number(cid);

      if (!Number.isInteger(pageNum) || pageNum < 1) {
        throw new BadRequestException('Page must be a positive integer');
      }
      if (!Number.isInteger(limitNum) || limitNum < 1) {
        throw new BadRequestException('Limit must be a positive integer');
      }
      if (!Number.isInteger(cidNum)) {
        throw new BadRequestException('Customer ID (cid) must be a valid number');
      }

      // Pagination
      const skip = (pageNum - 1) * limitNum;

      // Aggregation pipeline
      const pipeline: import('mongoose').PipelineStage[] = [
        { $match: { cid: cidNum } },
        {
          $unwind: { 
            path: '$products',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'products', // Collection name for products
            let: { productUid: '$products.product_uid' },
            pipeline: [
              { $match: { $expr: { $eq: ['$uid', '$$productUid'] } } },
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
            ],
            as: 'product_details',
          },
        },
        {
          $unwind: {
            path: '$product_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            uid: { $first: '$uid' },
            cid: { $first: '$cid' },
            products: {
              $push: {
                product_uid: '$products.product_uid',
                quantity: '$products.quantity',
                details: '$product_details',
              },
            },
            address_details: { $first: '$address_details' },
            payment_details: { $first: '$payment_details' },
            order_date: { $first: '$order_date' },
            delivery_date: { $first: '$delivery_date' },
            status: { $first: '$status' },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
        { $sort: { order_date: -1 } }, // Sort by order date, newest first
        { $skip: skip },
        { $limit: limitNum },
      ];

      // Execute aggregation
      const orders = await this.orderModel.aggregate(pipeline).exec();

      // Get total count for pagination
      const countPipeline = [{ $match: { cid: cidNum } }, { $count: 'total' }];
      const countResult = await this.orderModel.aggregate(countPipeline).exec();
      const total = countResult[0]?.total || 0;

      // Calculate pagination metadata
      const totalPages = Math.ceil(total / limitNum);

      if (!orders || orders.length === 0) {
        return {
          orders: [],
          pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages,
          },
        };
      }

      return {
        orders,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        error.message || 'Unable to fetch user orders',
      );
    }
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const createdOrder = await this.orderModel.create(createOrderDto);
      return {
        status: true,
        message: 'Order created successfully',
        order: createdOrder,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Unable to create order',
      );
    }
  }

  async updateOrder(uid: number, updateOrderDto: UpdateOrderDto) {
    try {
      const updatedOrder = await this.orderModel
        .findOneAndUpdate(
          { uid },
          { $set: updateOrderDto },
          { new: true },
        )
        .exec();
      if (!updatedOrder) {
        throw new NotFoundException('Order not found');
      }
      return {
        status: true,
        message: 'Order updated successfully',
        order: updatedOrder,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Unable to update order',
      );
    }
  }


  async deleteOrder(uid: number) {
    try {
      const deletedOrder = await this.orderModel
        .findOneAndDelete({ uid })
        .exec();
      if (!deletedOrder) {
        throw new NotFoundException('Order not found');
      }
      return {
        status: true,
        message: 'Order deleted successfully',
        order: deletedOrder,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Unable to delete order',
      );
    }
  }
}

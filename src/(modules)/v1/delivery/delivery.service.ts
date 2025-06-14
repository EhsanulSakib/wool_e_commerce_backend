import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Delivery } from 'src/schema/v1/delivery.schema';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Order } from 'src/schema/v1/order.schema';
import { OrderStatus } from 'src/types/v1/order.type';
import { DeliverySearchParams, DeliveryStatus } from 'src/types/v1/delivery.type';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery.name) private readonly deliveryModel: Model<Delivery>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async getSingleDelivery(uid?: number) {
    try {
      if (!uid) {
        throw new BadRequestException('Delivery UID is required');
      }
      const delivery = await this.deliveryModel.findOne({ uid }).exec();

      if (!delivery) {
        throw new NotFoundException('Delivery not found');
      }
      return delivery;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error fetching delivery',
      );
    }
  }

    async getMultipleDeliveries(status?: string, page: number = 1, limit: number = 25, search: DeliverySearchParams = {}) {
    try {
      // Validate pagination and status
      const pageNum = Number(page);
      const limitNum = Number(limit);
      if (!Number.isInteger(pageNum) || pageNum < 1) {
        throw new BadRequestException('Page must be a positive integer');
      }
      if (!Number.isInteger(limitNum) || limitNum < 1) {
        throw new BadRequestException('Limit must be a positive integer');
      }
      if (status && !Object.values(DeliveryStatus).includes(status as DeliveryStatus)) {
        throw new BadRequestException(`Status must be one of: ${Object.values(DeliveryStatus).join(', ')}`);
      }

      const query: any = {};
      if (status) {
        query.status = status;
      }

      // Apply search filters
      if (search.order_uid) {
        const orderUidNum = Number(search.order_uid);
        if (isNaN(orderUidNum)) {
          throw new BadRequestException('Order UID must be a valid number');
        }
        query.order_uid = orderUidNum;
      }
      if (search.tracking_number) {
        query.tracking_number = { $regex: search.tracking_number, $options: 'i' };
      }
      if (search.delivery_city) {
        query.delivery_city = { $regex: search.delivery_city, $options: 'i' };
      }
      if (search.delivery_state) {
        query.delivery_state = { $regex: search.delivery_state, $options: 'i' };
      }
      if (search.delivery_country) {
        query.delivery_country = { $regex: search.delivery_country, $options: 'i' };
      }
      if (search.delivery_postal_code) {
        const postalCodeNum = Number(search.delivery_postal_code);
        if (isNaN(postalCodeNum)) {
          throw new BadRequestException('Postal code must be a valid number');
        }
        query.delivery_postal_code = postalCodeNum;
      }

      // Pagination
      const skip = (pageNum - 1) * limitNum;

      // Fetch deliveries
      const deliveries = await this.deliveryModel
        .find(query)
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 }) // Sort by creation date, newest first
        .exec();

      // Get total count
      const totalCount = await this.deliveryModel.countDocuments(query).exec();

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limitNum);

      // Return empty result if no deliveries found
      if (!deliveries || deliveries.length === 0) {
        throw new NotFoundException('No deliveries found for the given criteria');
      }

      return {
        deliveries,
        totalCount,
        totalPages,
        page: pageNum,
        limit: limitNum,
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message || 'Error fetching deliveries');
    }
  }

  async createDelivery(createDeliveryDto: CreateDeliveryDto) {
    const session: ClientSession = await this.orderModel.db.startSession();
    session.startTransaction();

    try {
      const { order_uid } = createDeliveryDto;

      // Find and validate order
      const order = await this.orderModel
        .findOne({ uid: order_uid })
        .session(session)
        .exec();
      if (!order) {
        throw new NotFoundException('Order not found');
      }

      // Validate order status
      if (order.status !== OrderStatus.PENDING) {
        throw new BadRequestException(
          `Order must be in PENDING status to create a delivery, current status: ${order.status}`,
        );
      }

      // Update order status
      order.status = OrderStatus.CONFIRMED;
      await order.save({ session });

      // Create delivery
      const newDelivery = new this.deliveryModel(createDeliveryDto);
      const savedDelivery = await newDelivery.save({ session });

      // Commit transaction
      await session.commitTransaction();

      return {
        message: 'Delivery created successfully',
        delivery: savedDelivery,
      };
    } catch (error) {
      // Abort transaction on error
      await session.abortTransaction();

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      if (error.code === 11000) {
        throw new BadRequestException('Delivery UID already exists');
      }
      throw new InternalServerErrorException(
        error.message || 'Error creating delivery',
      );
    } finally {
      session.endSession();
    }
  }



  async updateDelivery(uid: number, updateDeliveryDto: UpdateDeliveryDto) {
    const session: ClientSession = await this.orderModel.db.startSession();
    session.startTransaction();

    try {
      const delivery = await this.deliveryModel
        .findOne({ uid })
        .session(session)
        .exec();

      if (!delivery) {
        throw new NotFoundException('Delivery not found');
      }

      const orderSearch = await this.orderModel.findOne({ uid: delivery.order_uid }).session(session).exec();

      if (!orderSearch) {
        throw new NotFoundException('Order not found');
      }

      if (orderSearch.status === OrderStatus.CONFIRMED) {
        throw new BadRequestException(
          `Order must be in CONFIRMED status to update a delivery, current status: ${orderSearch.status}`,
        );
      }
      
    }
    catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error updating delivery',
      );
    }
    finally {
      session.endSession();
    }
  }
}

import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('single-order')
  async getSingleOrder(
    @Query('uid') uid?: number,
  ) {
    return this.orderService.getSingleOrder(uid);
  }

  @Get('multiple-orders')
  async getMultipleOrders(
    @Query('status') status?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('search') search: any = {},
  ) {
    return this.orderService.getMultipleOrders(status, page, limit, search);
  }

  @Get('user-orders')
  async getUserOrders(
    @Query('cid') cid: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
  ) {
    return this.orderService.getUserOrders(cid, page, limit);
  }

  @Post('create-order')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put('update-order')
  async updateOrder(
    @Query('uid') uid: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(uid, updateOrderDto);
  }

  @Post('delete-order')
  async deleteOrder(
    @Query('uid') uid: number,
  ) {
    return this.orderService.deleteOrder(uid);
  }
}

import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService
  ) {}

  @Get('single-delivery')
  async getSingleDelivery(
    @Query('uid') uid?: number
  ) {
    return this.deliveryService.getSingleDelivery(uid);
  }

  @Get('multiple-deliveries')
  async getMultipleDeliveries(
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query() search: any = {}
  ) {
    return this.deliveryService.getMultipleDeliveries(status, page, limit, search);
  }

  @Post('create-delivery')
  async createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.createDelivery(createDeliveryDto);
  }

  @Put('update-delivery')
  async updateDelivery(
    @Query('uid') uid: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto
  ) {
    return this.deliveryService.updateDelivery(uid, updateDeliveryDto);
  }

  @Delete('delete-delivery')
  async deleteDelivery(
    @Query('uid') uid: number
  ) {
    return this.deliveryService.deleteDelivery(uid);
  }
}

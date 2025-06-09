import { Body, Controller, Delete, Get, Query, Post, Put, UseGuards } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeStatus } from 'src/types/v1/attribute.type';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { RolesGuard } from 'src/guards/v1/role.guard';
import { Role } from 'src/decorators/v1/role.decorator';
import { Role as RoleEnum } from 'src/types/v1/auth.types';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Get('single-attribute')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.STAFF)
  async getSingleAttribute(@Query('uid') uid: number) {
    return this.attributeService.getSingleAttribute(uid);
  }

  @Get('multiple-attributes')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.STAFF)
  async getMultipleAttributes(
    @Query('status') status: string = AttributeStatus.ACTIVE,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.attributeService.getMultipleAttributes(status, page, limit);
  }

  @Get('all-attributes')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.STAFF)
  async getAllAttributes(
    @Query('status') status: string = AttributeStatus.ACTIVE,
  ) {
    return this.attributeService.getAllAttributes(status);
  }

  @Post('create-attribute')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async createAttribute(@Body()createAttributeDto: CreateAttributeDto) {
    return this.attributeService.createAttribute(createAttributeDto);
  }

  @Put('update-attribute')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async updateAttribute(
    @Query('uid') uid: number,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributeService.updateAttribute(uid, updateAttributeDto);
  }

  @Delete('delete-attribute')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async deleteAttribute(@Query('uid') uid: number) {
    return this.attributeService.deleteAttribute(uid);
  }
}

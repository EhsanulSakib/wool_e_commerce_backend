import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeStatus } from 'src/types/v1/attribute.type';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Get('single-attribute')
  async getSingleAttribute(@Param('uid') uid: number) {
    return this.attributeService.getSingleAttribute(uid);
  }

  @Get('multiple-attributes')
  async getMultipleAttributes(
    @Param('status') status: string = AttributeStatus.ACTIVE,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    return this.attributeService.getMultipleAttributes(status, page, limit);
  }

  @Post('create-attribute')
  async createAttribute(@Param('createAttributeDto') createAttributeDto: any) {
    return this.attributeService.createAttribute(createAttributeDto);
  }

  @Put('update-attribute')
  async updateAttribute(
    @Param('uid') uid: number,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributeService.updateAttribute(uid, updateAttributeDto);
  }

  @Delete('delete-attribute')
  async deleteAttribute(@Param('uid') uid: number) {
    return this.attributeService.deleteAttribute(uid);
  }
}

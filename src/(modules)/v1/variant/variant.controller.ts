import { Body, Controller, Delete, Get, Query, Post, Put, UseGuards } from '@nestjs/common';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { RolesGuard } from 'src/guards/v1/role.guard';
import { Role as RoleEnum } from 'src/types/v1/auth.types';
import { Role } from 'src/decorators/v1/role.decorator';
@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Get('single-variant')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.STAFF)
  async getSingleVariant(@Query('uid') uid: number) {
    return this.variantService.getSingleVariant(uid);
  }

  @Get('multiple-variants')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.STAFF)
  async getMultipleVariants(
    @Query('status') status: string = 'ACTIVE',
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: object,
  ) {
    return this.variantService.getMultipleVariants(status, page, limit);
  }

  @Get('all-variants')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.STAFF)
  async getAllVariants(
    @Query('status') status: string = 'ACTIVE',
  ) {
    return this.variantService.getAllVariants(status);
  }

  @Post('create-variant')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async createVariant(
    @Body() createVariantDto: CreateVariantDto
  ) {
    return this.variantService.createVariant(createVariantDto);
  }

  @Put('update-variant')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async updateVariant(
    @Query('uid') uid: number,
    @Body() updateVariantDto: CreateVariantDto, // Assuming the DTO is similar for update
  ) {
    return this.variantService.updateVariant(uid, updateVariantDto);
  }

  @Delete('delete-variant')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async deleteVariant(@Query('uid') uid: number) {
    return this.variantService.deleteVariant(uid);
  }
}

import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/guards/v1/role.guard';
import { Role as RoleEnum } from 'src/types/v1/auth.types';
import { Role } from 'src/decorators/v1/role.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Get('single-product')
  async getSingleProduct(
    @Query('uid') uid?: number,
    @Query('name') name?: string,
  ) {
    return this.productService.getSingleProduct(uid, name);
  }

  @Get('multiple-products')
  async getMultipleProducts(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query() search: any = {},
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 25;
    return this.productService.getMultipleProducts(status, pageNum, limitNum, search);
  }

  @Post('create-product')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productService.createProduct(createProductDto);
  }

  @Put('update-product')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async updateProduct(
    @Query('uid') uid: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(uid, updateProductDto);
  }

  @Post('delete-product')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async deleteProduct(
    @Query('uid') uid: string,
  ) {
    return this.productService.deleteProduct(uid);
  }
  
}

import { Body, Controller, Delete, Get, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticateRequest } from 'src/types/v1/auth.types';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from 'src/guards/v1/role.guard';
import { Role } from 'src/decorators/v1/role.decorator';
import { Role as RoleEnum } from 'src/types/v1/auth.types';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole, UserStatus } from 'src/schema/v1/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('single')
  async getSingleUser(
    @Req() req: AuthenticateRequest,
    @Query('cid') cid: number,
  ) {
    return await this.userService.getSingleUser(cid);
  }

  @Get('admin/multiple')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async getMultipleUsers(
    @Req() req: AuthenticateRequest,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.userService.getMultipleUsers(page, limit);
  }

  @Post('create')
  async createUser(
    @Req() req: AuthenticateRequest,
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.userService.createUser(createUserDto);
  }

  @Put('update')
  async updateUser(
    @Req() req: AuthenticateRequest,
    @Query('cid') cid: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.userService.updateUser(cid, updateUserDto);
  }

  @Patch('admin/role')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async updateUserRole(
    @Req() req: AuthenticateRequest,
    @Query('cid') cid: number,
    @Body('role') role: UserRole,
  ) {
    return await this.userService.updateUserRole(cid, role);
  }

  @Patch('admin/status')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async updateUserStatus(
    @Req() req: AuthenticateRequest,
    @Query('cid') cid: number,
    @Body('status') status: UserStatus,
  ) {
    return await this.userService.updateUserStatus(cid, status);
  }

  @Delete('admin/delete')
  @UseGuards(RolesGuard)
  @Role(RoleEnum.ADMIN)
  async deleteUsers(
    @Req() req: AuthenticateRequest,
    @Body('cids') cids: number[],
  ) {
    return await this.userService.deleteUsers(cids);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/v1/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getSingleUser(cid: number) {
    const user = await this.userModel.findOne({ cid }).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getMultipleUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(limit).exec(),
      this.userModel.countDocuments().exec(),
    ])

    return { users, total };
  }

  async createUser(createUserDto: any) {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async updateUser(cid: number, updateUserDto: any) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ cid }, { $set: updateUserDto }, { new: true })
      .exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async updateUserRole(cid: number, role: string) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ cid }, { $set: { role } }, { new: true })
      .exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async updateUserStatus(cid: number, status: string) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ cid }, { $set: { status } }, { new: true })
      .exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async deleteUsers(cids: number[]) {
    const deletedUsers = await this.userModel.deleteMany({ cid: { $in: cids } }).exec();
    return deletedUsers.deletedCount;
  }
}

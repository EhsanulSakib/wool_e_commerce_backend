import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { generateId } from 'src/utils/v1/helper.utils';

export enum UserStatus {
    Active = 'active',
    Inactive = 'inactive',
    Banned = 'banned',
}

export enum UserRole {
    User = 'user',
    Admin = 'admin',
    Staff = 'staff',
}

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({
        required: true,
        unique: true,
        default: generateId,
    })
    cid: number;

    @Prop()
    image?: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true, lowercase: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phone?: string;

    @Prop()
    address?: string;

    @Prop({ required: true, default: false })
    is_verified: boolean;

    @Prop({ required: true, enum: UserStatus, default: UserStatus.Active })
    status: UserStatus;

    @Prop({ required: true, enum: UserRole, default: UserRole.User })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
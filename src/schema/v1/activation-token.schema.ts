import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ActivationToken extends Document {
    @Prop({ required: true, unique: true })
    cid: number;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    activationToken: string;

    @Prop({ required: true })
    expiresAt: Date;
}

export const ActivationTokenSchema = SchemaFactory.createForClass(ActivationToken);
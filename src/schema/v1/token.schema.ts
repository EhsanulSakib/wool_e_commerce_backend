import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema ({ timestamps: true })

export class Token extends Document {
    @Prop({ required: true })
    cid: number;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    accessToken: string;

    @Prop({ required: true })
    refreshToken: string;

    @Prop({ required: true })
    expiresAt: Date; 
}

export const TokenSchema = SchemaFactory.createForClass(Token);
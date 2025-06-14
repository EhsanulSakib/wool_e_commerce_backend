import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfig } from './config/v1/jwt.config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { mongodbConfig } from './config/v1/mongodb.config';
import { UserModule } from './(modules)/v1/user/user.module';
import { AuthModule } from './(modules)/v1/auth/auth.module';
import { AttributeModule } from './(modules)/v1/attribute/attribute.module';
import { VariantModule } from './(modules)/v1/variant/variant.module';
import { ProductModule } from './(modules)/v1/product/product.module';
import { OrderModule } from './(modules)/v1/order/order.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ReviewModule } from './(modules)/v1/review/review.module';
import { DeliveryModule } from './(modules)/v1/delivery/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', mongodbConfig.uri!),
        dbName: process.env.DB_NAME,
      }),
      inject: [ConfigService],
    }),
    CacheModule.register(),
    JwtModule.register(jwtConfig),
    JwtModule.register(jwtConfig),
    UserModule,
    AuthModule,
    AttributeModule,
    VariantModule,
    ProductModule,
    OrderModule,
    ReviewModule,
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

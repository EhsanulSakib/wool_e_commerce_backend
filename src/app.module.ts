import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfig } from './config/v1/jwt.config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { mongodbConfig } from './config/v1/mongodb.config';
import { UserModule } from './(modules)/v1/user/user.module';

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
    JwtModule.register(jwtConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/v1/jwt.config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/v1/user.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConfig.secret,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CacheModule.register(),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }

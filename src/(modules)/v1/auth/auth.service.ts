import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserStatus } from 'src/schema/v1/user.schema';
import { ActivationToken } from 'src/schema/v1/activation-token.schema';
import { Token } from 'src/schema/v1/token.schema';
import { CreateUserRegisterDto } from './dto/create-user-register.dto';
import { Session } from 'src/types/v1/auth.types';
import { SendMailUtil } from 'src/utils/v1/sendEmail.utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateUserLoginDto } from './dto/create-user-logn.dto';
import { CreateUserVerifyDto } from './dto/create-user-verify.dto';

@Injectable()
export class AuthService {
  private readonly sevenDaysExpire = 7 * 24 * 60 * 60 * 1000;
  private readonly hourExpire = 60 * 60 * 1000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(ActivationToken.name)
    private activationTokenModel: Model<ActivationToken>,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private jwtService: JwtService,
    private sendMailUtil: SendMailUtil,
  ) {}

  private createAccessAndRefreshToken(payload: Session) {
    try {
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

      return { accessToken, refreshToken };
    } catch (error) {
      return {};
    }
  }

  private async saveTokensToMemory(
    key: string | number,
    accessToken: string,
    refreshToken: string,
  ) {
    await this.cacheManager.set(
      `${key}_access_token`,
      accessToken,
      this.hourExpire,
    );

    await this.cacheManager.set(
      `${key}_refresh_token`,
      refreshToken,
      this.sevenDaysExpire,
    );
  }

  async register(createUserRegisterDto: CreateUserRegisterDto) {
    try {
      const { email, password, ...rest } = createUserRegisterDto;

      const isExist = await this.userModel.findOne({ email }).exec();
      if (isExist) {
        throw new BadRequestException('Email already exist');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.userModel({
        email,
        password: hashedPassword,
        ...rest,
      });
      const saveUser = await user.save();

      const payload: Session = {
        email: saveUser.email,
        cid: saveUser.cid.toString(),
        userName: saveUser.userName,
      };

      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      });

      // Cache the token
      await this.cacheManager.set(
        `${saveUser.cid}_email_token`,
        token,
        this.hourExpire,
      );

      // Send activation email
      const activationLink = `${process.env.FRONTEND_URL}/activate?token=${token}`;

      const message = `Hello ${saveUser.userName},\n\nPlease activate your account by clicking the following link: ${activationLink}\n\nThis link will expire in 24 hours.`;

      try {
        await this.sendMailUtil.sendMail(
          message,
          saveUser.email,
          'Wool (Activate Your Account)',
        );
      } catch (error) {
        console.error('Failed to send activation email:', error);
        throw new BadRequestException('Failed to send activation email');
      }

      return {
        message:
          'User registered successfully. Please check your email to activate your account.',
        user: {
          email: saveUser.email,
          userName: saveUser.userName,
          cid: saveUser.cid,
        },
      };
    } catch (e) {
      throw new InternalServerErrorException(
        e.message || 'Failed to register user',
      );
    }
  }

  async login(createUserLoginDto: CreateUserLoginDto) {
    try {
      const { email, password } = createUserLoginDto;

      const user = await this.userModel.findOne({ email }).exec();
      if (!user) throw new NotFoundException('User not found');

      if (user.status !== UserStatus.Active)
        throw new BadRequestException('User is not active');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new BadRequestException('Invalid password');

      const payload: Session = {
        cid: user.cid.toString(),
        email: user.email,
        userName: user.userName,
        user,
      };

      const { accessToken, refreshToken } =
        this.createAccessAndRefreshToken(payload);

      return {
        success: true,
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new InternalServerErrorException(
        e.message || 'Failed to login User. Try again!',
      );
    }
  }

  async activateAccount(createUserVerifyDto: CreateUserVerifyDto) {
    try {
      const { token } = createUserVerifyDto || {};

      const decode = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
      })

      if (!decode) {
          throw new BadRequestException('Unauthorized Access');
      }

      const { cid } = decode;

      const currentDate = Math.floor(Date.now() / 1000);
      const isExpired = decode.exp < currentDate;

      if (isExpired) {
          throw new BadRequestException('Token expired');
      }

      const user = await this.userModel.findOne({ cid }).exec();
      if (!user) throw new NotFoundException('User not found');

      if (user.status === UserStatus.Active)
          throw new BadRequestException('User is already active');
    
      if (user.status === UserStatus.Banned) {
          throw new BadRequestException('User is banned');
      }

      if (user.status === UserStatus.Inactive) {
          const updatedUser = await this.userModel
              .findOneAndUpdate({ cid }, { $set: { status: UserStatus.Active } }, { new: true })
              .exec();
          if (!updatedUser) throw new NotFoundException('User not found');
          return updatedUser;
      }

    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }
}

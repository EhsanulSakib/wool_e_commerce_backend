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
import { CreateUserRefreshDto } from './dto/create-user-refresh.dto';
import { VerifyRequest } from 'src/middlewares/v1/verify.middleware';
import { CreateUserForgotPasswordDto } from './dto/create-user-forgot-pass.dto';
import { CreateUserResetPasswordDto } from './dto/create-user-reset-pass.dto';

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
      });

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
          .findOneAndUpdate(
            { cid },
            { $set: { status: UserStatus.Active } },
            { new: true },
          )
          .exec();
        if (!updatedUser) throw new NotFoundException('User not found');
        return updatedUser;
      }
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException('Unable to activate the user', {
        cause: new Error(),
        description: e.message,
      });
    }
  }

  async refresh(createUserRefreshDto: CreateUserRefreshDto) {
    try {
      const { refreshToken } = createUserRefreshDto;

      const decode = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      if (!decode) {
        throw new BadRequestException('Unauthorized Access');
      }

      const refreshTokenFromCache = await this.cacheManager.get(
        `${decode.cid}_refresh_token`,
      );

      if (!refreshTokenFromCache) {
        throw new BadRequestException('Unauthorized Access');
      }

      if (refreshToken !== refreshTokenFromCache) {
        throw new BadRequestException('Unauthorized Access');
      }

      const cachedTokenDecoded = await this.jwtService.verify(
        refreshTokenFromCache,
        {
          secret: process.env.JWT_SECRET,
        },
      )

      const currentDate = Math.floor(Date.now() / 1000);
      const isExpired = cachedTokenDecoded.exp < currentDate;

      if(!cachedTokenDecoded || isExpired) {
        throw new BadRequestException('Unauthorized Access');
      }

      const payload: Session = {
        cid: cachedTokenDecoded.cid,
        email: cachedTokenDecoded.email,
        userName: cachedTokenDecoded.userName,
      };

      const { accessToken, refreshToken: newRefreshToken } =
        this.createAccessAndRefreshToken(payload);

      await this.cacheManager.set(
        `${cachedTokenDecoded.cid}_refresh_token`,
        newRefreshToken,
        6048000
      )

      return {
        accessToken,
        refreshToken: newRefreshToken,
      }
    } catch (e) {
      throw new InternalServerErrorException('Unable to refresh token', {
        cause: new Error(),
        description: e.message,
      });
    }
  }

  async logout(req: VerifyRequest){
    try{
      const user: Session = req.user;

      await this.cacheManager.del(`${user.cid}_access_token`);
      await this.cacheManager.del(`${user.cid}_refresh_token`);

      return {
        success: true,
        message: 'User logged out successfully',
      };
    }
    catch (e) {
      throw new InternalServerErrorException('Unable to logout user', {
        cause: new Error(),
        description: e.message,
      });
    }
  }

  async forgotPassword(createUserForgotPasswordDto: CreateUserForgotPasswordDto) {
    try{
      const {email} = createUserForgotPasswordDto

      const user = await this.userModel.findOne({ email }).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.status !== UserStatus.Active) {
        throw new BadRequestException('User is not active');
      }

      const payload = {
        cid: user.cid.toString(),
        email: user.email,
      }

      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      });

      await this.cacheManager.set(
        `${user.cid.toString()}_forgot_password_token`,
        token,
        this.hourExpire,
      );

      const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`

      await this.sendMailUtil.sendMail(
        `Please use the following link to reset your password: ${resetPasswordLink}`,
        user.email,
        'Reset Password (Wool)',
      );

      return {
        status: true,
        message: 'Password reset link sent to your email. Please check your inbox.',
      };

    }
    catch(e){
      throw new InternalServerErrorException('Unable to process forgot password request', {
        cause: new Error(),
        description: e.message,
      });
    }
  }

  async resetPassword(createUserResetPasswordDto: CreateUserResetPasswordDto) {
    try {
      const { token, newPassword } = createUserResetPasswordDto;

      const decode = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const tokenFromCache = await this.cacheManager.get(
        `${decode.cid}_reset_password_token`,
      );

      if (!tokenFromCache || token !== tokenFromCache) {
        throw new BadRequestException('Invalid or expired token');
      }

      const user = await this.userModel.findOne({ cid: decode.cid }).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      } 

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Remove the token from cache
      await this.cacheManager.del(`${decode.cid}_reset_password_token`);

      return {
        status: true,
        message: 'Password reset successfully!',
      }
    } catch (e) {
      throw new InternalServerErrorException(
        e.message || 'Failed to reset password',
      );
    }
  }
}

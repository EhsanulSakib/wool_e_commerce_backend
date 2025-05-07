import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyRequest } from 'src/middlewares/v1/verify.middleware';
import { CreateUserRegisterDto } from './dto/create-user-register.dto';
import { User } from 'src/schema/v1/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('session')
    @UsePipes(new ValidationPipe())

    session(@Req() req: VerifyRequest) {
        const session = req.user;
        return this.authService.session(req);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(
      @Body() createUserRegisterDto: CreateUserRegisterDto,
    ): Promise<User | { accessToken: string; refreshToken: string }> {
      return this.authService.register(createUserRegisterDto);
    }
}

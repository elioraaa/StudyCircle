import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterDto, LoginDto, ForgotPasswordDto } from './dto/auth.dto';


interface AuthRequest {
  user: { sub: number; email: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: AuthRequest) {
    return this.authService.me(req.user.sub);
  }

  @Post('forgot-password')
  @HttpCode(200)
  forgotPassword(@Body() _dto: ForgotPasswordDto) {

    return this.authService.forgotPassword();
  }
}
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestResponseDto } from '../request/request.dto';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(public authService: AuthService) {}

  @ApiCreatedResponse({ type: LoginResponseDto })
  @ApiResponse({ status: 400, type: RequestResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiResponse({ status: 400, type: RequestResponseDto })
  @ApiResponse({ status: 200, type: RequestResponseDto })
  @Post('signUp')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @ApiResponse({ status: 401, type: RequestResponseDto })
  @ApiResponse({ status: 200, type: OmitType(User, ['password']) })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiHeader({ name: 'Authorization', description: 'Bearer {access_token}' })
  getUserInfo(@Request() req) {
    return this.authService.getUser(req.user);
  }
}

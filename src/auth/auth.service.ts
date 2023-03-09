import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { SignUpUserDto } from './dto/signup-user.dto';
import { getUserWithoutPassword, sendOkResponse } from '../utils/utils';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || '',
    );

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }

    const payload = { email: user.email, sub: user.id };

    const access_token = this.jwtService.sign(payload);
    const { password, ...rest } = user;

    return { user: rest, access_token };
  }

  async signUp({ lastName, firstName, password, email }: SignUpUserDto) {
    const user = await this.usersService.findByEmail(email);
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = await this.usersService.create({
      firstName,
      lastName,
      password: encryptedPassword,
      email,
    });

    if (newUser) {
      return sendOkResponse('User created successfully');
    }
  }

  async getUser(user: User) {
    const _user = await this.usersService.findByEmail(user.email);

    return getUserWithoutPassword(_user);
  }
}

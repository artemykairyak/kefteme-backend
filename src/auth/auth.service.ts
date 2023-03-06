import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { SignUpUserDto } from './dto/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const _user = await this.usersService.findByEmail(user.email);
    const access_token = this.jwtService.sign({ userId: _user.id });
    const { password, ...rest } = _user;

    return { user: rest, access_token };
  }

  async signUp({ lastName, firstName, password, email }: SignUpUserDto) {
    const user = await this.usersService.findByEmail(email);
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return this.usersService.create({
      firstName,
      lastName,
      password: encryptedPassword,
      email,
    });
  }

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

    throw new Error('Invalid email or password');
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}

  @ApiOkResponse({ type: OmitType(User, ['password']), isArray: true })
  @Get()
  getUsers() {
    return this.service.findAll();
  }

  @ApiOkResponse({ type: OmitType(User, ['password']) })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.service.findById(+id);
  }

  @ApiCreatedResponse({ type: OmitType(User, ['password']) })
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }
}

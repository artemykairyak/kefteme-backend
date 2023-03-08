import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}

  @ApiExcludeEndpoint()
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.service.findById(+id);
  }

  @ApiExcludeEndpoint()
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }
}

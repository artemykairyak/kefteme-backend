import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../request-response/dto/response.dto';
import { Type } from './entities/type.entity';

@ApiTags('types')
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @ApiCreatedResponse({ type: ResponseDto })
  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @ApiOkResponse({ type: Type, isArray: true })
  @Get()
  findAll() {
    return this.typesService.findAll();
  }

  @ApiOkResponse({ type: ResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.remove(id);
  }
}

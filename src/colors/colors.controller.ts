import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Color } from './entities/color.entity';
import { ResponseDto } from '../request-response/dto/response.dto';

@ApiTags('colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @ApiCreatedResponse({ type: ResponseDto })
  @Post()
  async create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @ApiOkResponse({ type: Color, isArray: true })
  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @ApiOkResponse({ type: ResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorsService.remove(id);
  }
}

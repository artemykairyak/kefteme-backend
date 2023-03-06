import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';

@Controller('color')
export class ColorsController {
  constructor(private readonly service: ColorsService) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.service.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

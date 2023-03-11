import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../request-response/dto/response.dto';
import { Size } from './entities/size.entity';

@ApiTags('sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @ApiCreatedResponse({ type: ResponseDto })
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @ApiOkResponse({ type: Size, isArray: true })
  @Get()
  findAll() {
    return this.sizesService.findAll();
  }

  @ApiCreatedResponse({ type: ResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizesService.remove(id);
  }
}

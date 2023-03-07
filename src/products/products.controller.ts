import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { GetProductsDto } from './dto/get-products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(public service: ProductsService) {}

  @ApiOkResponse({ type: Product, isArray: true })
  @ApiQuery({
    name: 'page',
    required: false,
    example: '1',
    description: 'Default: 1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: '10',
    description: 'Default: 10',
  })
  @ApiQuery({ name: 'color', required: false, example: 'red,blue' })
  @ApiQuery({ name: 'type', required: false, example: 'sneakers,boots' })
  @ApiQuery({ name: 'size', required: false, example: '46,48' })
  @ApiQuery({ name: 'sort', required: false, example: 'name-ASC' })
  @Get()
  async getProducts(@Query() getProductsDto: GetProductsDto) {
    const [products, total] = await this.service.findAll(getProductsDto);
    return { data: products, total };
  }

  @ApiOkResponse({ type: Product })
  @ApiNotFoundResponse()
  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.service.findById(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @ApiCreatedResponse({ type: Product })
  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.service.create(body);
  }
}

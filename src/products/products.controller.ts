import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { ProductsResponseDto } from './dto/products-response.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ResponseDto } from '../request-response/dto/response.dto';
import { UpdateProductDto } from './dto/update-product.dto';

class ProductResponseDtoOmittedQuantity extends OmitType(ProductResponseDto, [
  'quantity',
]) {}

class ProductOptionalBody extends PartialType(
  ProductResponseDtoOmittedQuantity,
) {}

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(public service: ProductsService) {}

  @ApiCreatedResponse({ type: ResponseDto })
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.service.create(createProductDto);
  }

  @ApiOkResponse({
    type: ProductsResponseDto,
    isArray: true,
  })
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

  @ApiOkResponse({
    type: ProductResponseDtoOmittedQuantity,
  })
  @ApiNotFoundResponse({ type: ResponseDto })
  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findById(id);
  }

  @Patch(':id')
  @ApiBody({
    type: ProductOptionalBody,
    required: false,
    description: 'All fields are optional',
  })
  @ApiOkResponse({
    type: UpdateProductDto,
  })
  async editProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto?: UpdateProductDto,
  ) {
    return await this.service.edit(id, updateProductDto);
  }

  @ApiResponse({ status: 200, type: ResponseDto })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}

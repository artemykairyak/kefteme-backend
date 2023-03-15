import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { Color } from '../colors/entities/color.entity';
import { Type } from '../types/entities/type.entity';
import { Size } from '../sizes/entities/size.entity';
import { ProductsResponseDto } from './dto/products-response.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { getFlatProduct, sendOkResponse } from '../utils/utils';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(Color) private colorRepo: Repository<Color>,
    @InjectRepository(Type) private typeRepo: Repository<Type>,
    @InjectRepository(Size) private sizeRepo: Repository<Size>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const color = await this.colorRepo.findOne({
      where: { id: createProductDto.color },
    });

    const type = await this.typeRepo.findOne({
      where: { id: createProductDto.type },
    });

    const size = await this.sizeRepo.findOne({
      where: { id: createProductDto.size.toString() },
    });

    if (!color) {
      throw new NotFoundException(
        `Color "${createProductDto.color}" not found`,
      );
    }

    if (!type) {
      throw new NotFoundException(`Type "${createProductDto.type}" not found`);
    }

    if (!size) {
      throw new NotFoundException(`Size "${createProductDto.size}" not found`);
    }

    const newProduct = this.repo.create({
      ...createProductDto,
      color,
      type,
      size,
    });

    await this.repo.save(newProduct);
    return sendOkResponse(
      `Product ${createProductDto.name} was succesfully created`,
    );
  }

  async findAll(
    getProductsDto: GetProductsDto,
  ): Promise<[ProductsResponseDto[], number]> {
    const { page = 1, limit = 10, type, color, size, sort } = getProductsDto;

    const [sortField, sortOrder] = sort ? sort.split('-') : [];

    const query = this.repo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.color', 'color')
      .leftJoinAndSelect('product.type', 'type')
      .leftJoinAndSelect('product.size', 'size')
      .select([
        'product.id',
        'product.name',
        'product.price',
        'product.picture',
        'product.size',
        'product.type',
        'color.id',
        'type.id',
        'size.id',
      ]);

    if (color) {
      const colorsArray = color.split(',');
      query.where('product.color IN (:...colors)', { colors: colorsArray });
    }

    if (type) {
      const typesArray = type.split(',');
      query.where('product.type IN (:...types)', { types: typesArray });
    }

    if (size) {
      const sizesArray = size.split(',');
      query.where('product.size IN (:...sizes)', { sizes: sizesArray });
    }

    if (
      ['name', 'price'].includes(sortField) &&
      ['ASC', 'DESC'].includes(sortOrder)
    ) {
      query.orderBy(`product.${sortField}`, sortOrder as 'ASC' | 'DESC');
    }

    const [products, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const mappedProducts: ProductsResponseDto[] = products.map(
      ({ name, price, id, picture, color }) => {
        return {
          id,
          name,
          price: +price,
          picture,
          color: color.id,
        };
      },
    );

    return [mappedProducts, total];
  }

  async findById(productId: number): Promise<ProductResponseDto> {
    const product = await this.repo.findOne({
      where: { id: productId },
      relations: ['color', 'type', 'size'],
    });

    if (!product) {
      throw new HttpException(
        `Product with id ${productId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      ...product,
      price: +product.price,
      size: +product.size.id,
      type: product.type.id,
      color: product.color.id,
    };
  }

  async edit(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['type', 'size', 'color'],
    });

    if (!product) {
      throw new HttpException(
        `Product with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateProductDto.color) {
      const color = await this.colorRepo.findOne({
        where: { id: updateProductDto.color },
      });

      if (!color) {
        throw new HttpException(
          `Color ${updateProductDto.color} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      product.color = color;
    }

    if (updateProductDto.type) {
      const type = await this.typeRepo.findOne({
        where: { id: updateProductDto.type },
      });

      if (!type) {
        throw new HttpException(
          `Type ${updateProductDto.type} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      product.type = type;
    }

    if (updateProductDto.size) {
      const size = await this.sizeRepo.findOne({
        where: { size: updateProductDto.size },
      });

      if (!size) {
        throw new HttpException(
          `Size ${updateProductDto.size} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      product.size = size;
    }

    const updatedProduct = this.repo.merge(
      product,
      updateProductDto as unknown as Product,
    );

    await this.repo.save(updatedProduct);

    return sendOkResponse(
      `Product with id ${id} was successfully updated`,
      getFlatProduct(updatedProduct),
    );
  }

  async remove(id: number) {
    await this.repo.delete(id);

    return sendOkResponse(`Product with id ${id} was successfully deleted`);
  }
}

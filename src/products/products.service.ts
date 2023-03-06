import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { Color } from '../colors/entities/color.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(Color) private colorRepo: Repository<Color>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const color = await this.colorRepo.findOne({
      where: { id: createProductDto.color },
    });

    if (!color) {
      throw new NotFoundException(
        `Color "${createProductDto.color}" not found`,
      );
    }

    const newProduct = this.repo.create({
      ...createProductDto,
      color,
    });

    return this.repo.save(newProduct);
  }

  async findAll(getProductsDto: GetProductsDto): Promise<[Product[], number]> {
    const { page = 1, limit = 10, type, color, size } = getProductsDto;

    const query = this.repo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.color', 'color');

    if (color) {
      const colorsArray = color.split(',');
      query.where('product.colors IN (:...colors)', { colors: colorsArray });
    }

    if (type) {
      const typesArray = type.split(',');
      query.where('product.type IN (:...types)', { types: typesArray });
    }

    if (size) {
      const sizesArray = size.split(',');
      query.where('product.size IN (:...sizes)', { sizes: sizesArray });
    }

    const [products, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return [products, total];
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { Color } from '../colors/entities/color.entity';
import { Type } from '../types/entities/type.entity';
import { Size } from '../sizes/entities/size.entity';

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
      where: { id: createProductDto.size },
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

    return this.repo.save(newProduct);
  }

  async findAll(getProductsDto: GetProductsDto): Promise<[Product[], number]> {
    const { page = 1, limit = 10, type, color, size } = getProductsDto;

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

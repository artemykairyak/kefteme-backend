import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Color } from '../colors/entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Color])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

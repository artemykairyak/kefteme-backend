import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './order-product.entity';

@Module({ imports: [TypeOrmModule.forFeature([OrderProduct])] })
export class OrderProductsModule {}

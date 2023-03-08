import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { OrderProduct } from '../order-products/order-product.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Color } from '../colors/entities/color.entity';
import { Type } from '../types/entities/type.entity';
import { Size } from '../sizes/entities/size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Product,
      User,
      OrderProduct,
      Color,
      Type,
      Size,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService, ProductsService],
})
export class OrdersModule {}

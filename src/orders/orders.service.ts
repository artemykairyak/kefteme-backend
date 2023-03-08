import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { OrderProduct } from '../order-products/order-product.entity';
import { ProductsService } from '../products/products.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async create(user, createOrderDto: CreateOrderDto) {
    const _user = await this.usersService.findById(user.id);

    if (!_user) {
      throw new HttpException(
        `User with ID ${user.id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = new Order();
    order.id = uuidv4();
    order.user = _user;
    order.date = new Date();
    order.sum = createOrderDto.sum;
    order.status = 1;

    const orderProducts = [];

    for (const { productId, quantity } of createOrderDto.products) {
      const foundedProduct = await this.productsService.findById(productId);

      if (!foundedProduct) {
        throw new HttpException(
          `Product with ID ${productId} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const orderProduct = new OrderProduct();
      orderProduct.orderId = order.id;
      orderProduct.productId = productId;
      orderProduct.quantity = quantity;

      orderProducts.push(orderProduct);
    }

    order.orderProducts = orderProducts;

    await this.orderRepository
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values(order)
      .execute();

    orderProducts.forEach((item) => {
      this.orderProductRepository
        .createQueryBuilder()
        .insert()
        .into(OrderProduct)
        .values(item)
        .execute();
    });

    throw new HttpException('Order was successfully created', HttpStatus.OK);
  }

  async findAllUserOrders(user: User) {
    const _user = await this.usersService.findById(user.id);

    if (!_user) {
      throw new HttpException(
        `User with ID ${user.id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const query = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.user', 'user')
      .where('user.id = :id', { id: _user.id })
      .leftJoinAndSelect('order.orderProducts', 'orderProduct')
      .leftJoinAndSelect('orderProduct.product', 'product')
      .getMany();

    return query.map((order) => {
      const products = order.orderProducts.map((product) => {
        return product.product;
      });

      return {
        date: order.date,
        id: order.id,
        sum: order.sum,
        status: order.status,
        products,
      };
    });
  }

  async findOrderByUserId(user: User, orderId: string) {}

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

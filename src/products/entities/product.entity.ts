import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Color } from '../../colors/entities/color.entity';
import { Type } from '../../types/entities/type.entity';
import { Size } from '../../sizes/entities/size.entity';
import { OrderProduct } from '../../order-products/order-product.entity';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty()
  @ManyToOne(() => Color, (color) => color.products, { eager: false })
  @JoinColumn({ name: 'colorId' })
  color: Color;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @ManyToOne(() => Size, (size) => size.products, { eager: false })
  @JoinColumn({ name: 'sizeId' })
  size: Size;

  @ApiProperty()
  @ManyToOne(() => Type, (type) => type.products, { eager: false })
  @JoinColumn({ name: 'typeId' })
  type: Type;

  @ApiProperty()
  @Column()
  picture: string;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  // @ManyToMany(() => Order, (order) => order.products)
  // @JoinColumn({ name: 'orderId' })
  // orders: Order[];
}

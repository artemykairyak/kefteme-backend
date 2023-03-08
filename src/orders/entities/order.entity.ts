import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { OrderProduct } from '../../order-products/order-product.entity';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  status: number;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sum: number;

  // @ApiProperty()
  // @ManyToOne(() => User, (user) => user.orders)
  // user: User;
  //
  // @ApiProperty()
  // @ManyToMany(() => Product, (product) => product.orders)
  // @JoinTable()
  // products: Product[];

  @ManyToOne(() => User, (user) => user.orders)
  user: Omit<User, 'password'>;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];
}

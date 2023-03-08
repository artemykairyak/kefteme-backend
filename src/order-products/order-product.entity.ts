import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  productId: number;

  @Column()
  orderId: string;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;

  // @Exclude()
  // @ManyToOne(() => Order, (order) => order.orderProducts)
  // order: Order;
  //
  // @Exclude()
  // @ManyToOne(() => Product, (product) => product.orderProducts)
  // product: Product;
}

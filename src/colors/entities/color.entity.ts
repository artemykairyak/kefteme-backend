import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Color {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  color: string;

  @OneToMany(() => Product, (product) => product.color)
  products: Product[];
}

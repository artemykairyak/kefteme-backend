import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Size {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  size: number;

  @OneToMany(() => Product, (product) => product.size)
  products: Product[];
}

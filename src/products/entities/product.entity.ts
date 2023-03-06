import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Color } from '../../colors/entities/color.entity';

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
  @JoinColumn({ name: 'color' })
  color: Color;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  // Todo: link size
  size: number;

  @ApiProperty()
  @Column()
  // Todo: link type
  type: string;

  @ApiProperty()
  @Column()
  picture: string;
}

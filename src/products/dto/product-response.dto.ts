import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  color: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  picture: string;

  @ApiProperty()
  quantity?: number;
}

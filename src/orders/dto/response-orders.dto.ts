import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';

export class ResponseOrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  sum: number;

  @ApiProperty()
  products: Product[];
}

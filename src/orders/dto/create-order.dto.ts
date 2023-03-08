import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  products: Array<{ productId: number; quantity: number }>;

  @ApiProperty()
  sum: number;
}

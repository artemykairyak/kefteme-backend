import { ApiProperty } from '@nestjs/swagger';
import { OrderProductDto } from './order-product.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({ type: OrderProductDto, isArray: true })
  products: Array<OrderProductDto>;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  sum: number;
}

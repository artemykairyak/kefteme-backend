import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../products/dto/product-response.dto';

export class ResponseOrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  sum: number;

  @ApiProperty({ type: ProductResponseDto, isArray: true })
  products: ProductResponseDto[];
}

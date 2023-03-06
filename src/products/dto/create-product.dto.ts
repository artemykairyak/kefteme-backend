import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  color: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  // Todo: link size
  size: number;

  @ApiProperty()
  // Todo: link type
  type: string;

  @ApiProperty()
  picture: string;
}

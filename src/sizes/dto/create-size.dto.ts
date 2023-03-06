import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  size: string;
}

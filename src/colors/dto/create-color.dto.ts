import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  color: string;
}

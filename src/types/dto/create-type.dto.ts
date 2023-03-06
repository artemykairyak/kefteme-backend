import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

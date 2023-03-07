import { ApiProperty } from '@nestjs/swagger';

export class RequestResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

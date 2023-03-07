import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductsDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  color?: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  size?: string;

  @IsOptional()
  sort?: string;
}

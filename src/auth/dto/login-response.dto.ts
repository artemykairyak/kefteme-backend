import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: OmitType(User, ['password']) })
  user: User;
}

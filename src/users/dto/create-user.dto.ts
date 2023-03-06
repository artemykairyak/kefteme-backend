import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}

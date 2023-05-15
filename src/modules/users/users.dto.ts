import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
}

export class UserRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

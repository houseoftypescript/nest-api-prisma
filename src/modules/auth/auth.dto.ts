import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty()
  token: string;
}

export class TokenRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class ListResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  primary: boolean;

  @ApiProperty()
  userId: string;
}

export class ListRequestDto {
  @ApiProperty()
  title: string;
}

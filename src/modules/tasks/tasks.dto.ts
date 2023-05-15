import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  listId: string;
}

export class TaskRequestDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  listId: string;
}

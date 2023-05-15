import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { List } from '@prisma/client';
import { ListRequestDto, ListResponseDto } from './lists.dto';
import { ListRequest, ListsService } from './lists.service';

@ApiTags('Lists')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  @ApiResponse({ type: [ListResponseDto] })
  async getLists(): Promise<List[]> {
    return this.listsService.getLists();
  }

  @Post()
  @ApiBody({ type: ListRequestDto })
  @ApiResponse({ type: ListResponseDto })
  async createList(@Request() request: { user_id: string }, @Body() { title }: ListRequest): Promise<List> {
    const { user_id } = request;
    return this.listsService.createList(user_id, { title });
  }

  @Get(':id')
  @ApiResponse({ type: ListResponseDto })
  async getList(@Param() params: { id: string }): Promise<List> {
    const { id } = params;
    return this.listsService.getList(id);
  }

  @Patch(':id')
  @ApiBody({ type: ListRequestDto })
  @ApiResponse({ type: ListResponseDto })
  async updateList(
    @Request() request: { user_id: string },
    @Param() params: { id: string },
    @Body() { title }: ListRequest,
  ): Promise<List> {
    const { id } = params;
    const { user_id } = request;
    return this.listsService.updateList(user_id, id, { title });
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  async deleteList(@Request() request: { user_id: string }, @Param() params: { id: string }): Promise<void> {
    const { id } = params;
    const { user_id } = request;
    return this.listsService.deleteList(user_id, id);
  }
}

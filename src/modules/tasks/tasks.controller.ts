import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { LocalAuthGuard } from '../../common/guards/local.guard';
import { TaskResponseDto } from './tasks.dto';
import { TaskRequest, TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(LocalAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiResponse({ type: [TaskResponseDto] })
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Post()
  @ApiResponse({ type: TaskResponseDto })
  async createTask(@Body() { title, description, listId }: TaskRequest): Promise<Task> {
    return this.tasksService.createTask({ title, description, listId });
  }

  @Get('{id}')
  @ApiResponse({ type: TaskResponseDto })
  async getTask(@Param() params: { id: string }): Promise<Task> {
    const { id } = params;
    return this.tasksService.getTask(id);
  }

  @Patch('{id}')
  @ApiResponse({ type: TaskResponseDto })
  async updateTask(
    @Param() params: { id: string },
    @Body() { title, description, completed, listId }: TaskRequest,
  ): Promise<Task> {
    const { id } = params;
    return this.tasksService.updateTask(id, { title, description, completed, listId });
  }

  @Delete('{id}')
  @ApiResponse({ status: 204 })
  async deleteTask(@Param() params: { id: string }): Promise<void> {
    const { id } = params;
    return this.tasksService.deleteTask(id);
  }
}

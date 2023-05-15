import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { v4 } from 'uuid';
import { PrismaService } from '../../common/prisma/prisma.service';

export type TaskRequest = {
  listId: string;
  title: string;
  description?: string;
  completed?: boolean;
};

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks() {
    const tasks: Task[] = await this.prismaService.task.findMany();
    return tasks;
  }

  async createTask({ title, description = '', listId }: TaskRequest): Promise<Task> {
    const id = v4();
    const data = { id, title, description, completed: false, listId };
    const task: Task = await this.prismaService.task.create({ data });
    return task;
  }

  async getTask(id: string): Promise<Task> {
    const task: Task = await this.prismaService.task.findFirstOrThrow({ where: { id } });
    return task;
  }

  async updateTask(id: string, { title, description = '', completed = false, listId }: TaskRequest): Promise<Task> {
    const data = { title, description, completed, listId };
    const task: Task = await this.prismaService.task.update({ data, where: { id } });
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await this.prismaService.task.delete({ where: { id } });
  }
}

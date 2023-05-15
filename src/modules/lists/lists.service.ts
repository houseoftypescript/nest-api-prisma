import { Injectable } from '@nestjs/common';
import { List } from '@prisma/client';
import { v4 } from 'uuid';
import { PrismaService } from '../../common/prisma/prisma.service';

export type ListRequest = {
  title: string;
};

@Injectable()
export class ListsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getLists() {
    const lists: List[] = await this.prismaService.list.findMany();
    return lists;
  }

  public async createList(userId: string, { title }: ListRequest): Promise<List> {
    const id = v4();
    const list: List = await this.prismaService.list.create({ data: { id, title, primary: false, userId } });
    return list;
  }

  public async getList(id: string): Promise<List> {
    const list: List = await this.prismaService.list.findFirstOrThrow({ where: { id } });
    return list;
  }

  public async updateList(userId: string, id: string, { title }: ListRequest): Promise<List> {
    const list: List = await this.prismaService.list.update({
      data: { title },
      where: { id, id_userId: { id, userId } },
    });
    return list;
  }

  public async deleteList(userId: string, id: string): Promise<void> {
    await this.prismaService.list.delete({ where: { id, id_userId: { id, userId } } });
  }
}

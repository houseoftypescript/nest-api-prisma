import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  controllers: [ListsController],
  providers: [PrismaService, ListsService],
})
export class ListsModule {}

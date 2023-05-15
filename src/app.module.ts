import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { ListsModule } from './modules/lists/lists.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [HealthModule, ListsModule, TasksModule, UsersModule],
})
export class AppModule {}

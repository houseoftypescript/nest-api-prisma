import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { ListsModule } from './modules/lists/lists.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import environments from './common/environments/environments';

@Module({
  imports: [
    JwtModule.register({
      secret: environments.jwtSecret,
      signOptions: { expiresIn: '300s' },
    }),
    AuthModule,
    HealthModule,
    ListsModule,
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}

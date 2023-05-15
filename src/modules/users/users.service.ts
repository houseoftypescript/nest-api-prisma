import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import environments from '../../common/environments/environments';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserResponseDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(id: string): Promise<User> {
    const user: User = await this.prismaService.user.findFirstOrThrow({ where: { id } });
    return user;
  }

  async updateEmail(id: string, email: string): Promise<UserResponseDto> {
    const select = { id: true, email: true, username: true };
    const user: UserResponseDto = await this.prismaService.user.update({
      data: { email },
      where: { id },
      select,
    });
    return user;
  }

  async updateUsername(id: string, username: string): Promise<UserResponseDto> {
    const select = { id: true, email: true, username: true };
    const user: UserResponseDto = await this.prismaService.user.update({
      data: { username },
      where: { id },
      select,
    });
    return user;
  }

  async updatePassword(id: string, password: string): Promise<UserResponseDto> {
    const hash: string = await bcrypt.hash(password, environments.saltOrRounds);
    const select = { id: true, email: true, username: true };
    const user: UserResponseDto = await this.prismaService.user.update({
      data: { password: hash },
      where: { id },
      select,
    });
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import environments from 'src/common/environments/environments';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserResponseDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(id: string): Promise<User> {
    const user: User = await this.prismaService.user.findFirstOrThrow({ where: { id } });
    return user;
  }

  async updateUsername(id: string, username: string): Promise<UserResponseDto> {
    const user: UserResponseDto = await this.prismaService.user.update({
      data: { username },
      where: { id },
      select: { id: true, username: true },
    });
    return user;
  }

  async updatePassword(id: string, password: string): Promise<UserResponseDto> {
    const hash: string = await bcrypt.hash(password, environments.saltOrRounds);
    const user: UserResponseDto = await this.prismaService.user.update({
      data: { password: hash },
      where: { id },
      select: { id: true, username: true },
    });
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}

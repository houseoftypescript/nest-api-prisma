import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import environments from '../../common/environments/environments';
import { PrismaService } from '../../common/prisma/prisma.service';
import { TokenResponseDto, UserRequestDto, UserResponseDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService) {}

  async getUser(id: string): Promise<User> {
    const user: User = await this.prismaService.user.findFirstOrThrow({ where: { id } });
    return user;
  }

  async signIn({ username = '', password = '' }: UserRequestDto): Promise<TokenResponseDto> {
    const user: User = await this.prismaService.user.findFirstOrThrow({ where: { username } });
    const { id: user_id, password: hash } = user;
    const isMatch = await bcrypt.compare(password, hash);
    if (isMatch) {
      const token: string = this.jwtService.sign(
        { user_id, scopes: ['lists:read', 'lists:write', 'tasks:read', 'tasks:write', 'users:read', 'users:write'] },
        { secret: environments.jwtSecret },
      );
      return { token };
    }
    throw new Error('Login Error');
  }

  async signUp({ username, password }: UserRequestDto): Promise<UserResponseDto> {
    const id: string = v4();
    const hash: string = await bcrypt.hash(password, environments.saltOrRounds);
    const user: UserResponseDto = await this.prismaService.user.create({
      data: { id, username, password: hash },
      select: { id: true, username: true },
    });
    const { id: userId } = user;
    const listId: string = v4();
    await this.prismaService.list.create({ data: { id: listId, title: 'Tasks', userId, primary: true } });
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

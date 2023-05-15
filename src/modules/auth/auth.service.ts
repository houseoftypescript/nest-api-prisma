import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import environments from 'src/common/environments/environments';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { v4 } from 'uuid';
import { UserRequestDto, UserResponseDto } from '../users/users.dto';
import { TokenRequestDto, TokenResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService) {}

  async signIn({ username = '', password = '' }: TokenRequestDto): Promise<TokenResponseDto> {
    const user: User = await this.prismaService.user.findFirstOrThrow({ where: { username } });
    const { id: user_id, password: hash } = user;
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) throw new Error('Login Error');
    const scopes = ['lists:read', 'lists:write', 'tasks:read', 'tasks:write', 'users:read', 'users:write'];
    const token: string = this.jwtService.sign({ user_id, scopes });
    return { token };
  }

  async signUp({ username, password }: UserRequestDto): Promise<TokenResponseDto> {
    const id: string = v4();
    const hash: string = await bcrypt.hash(password, environments.saltOrRounds);
    const user: UserResponseDto = await this.prismaService.user.create({
      data: { id, username, password: hash },
      select: { id: true, username: true },
    });
    const { id: userId } = user;
    const listId: string = v4();
    await this.prismaService.list.create({ data: { id: listId, title: 'Tasks', userId, primary: true } });
    const scopes: string[] = ['lists:read', 'lists:write', 'tasks:read', 'tasks:write', 'users:read', 'users:write'];
    const token: string = this.jwtService.sign({ user_id: userId, scopes });
    return { token };
  }
}

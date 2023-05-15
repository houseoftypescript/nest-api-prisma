import { Body, Controller, Delete, Get, Injectable, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserRequestDto, UserResponseDto } from './users.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/common/guards/local.guard';

@Injectable()
@ApiTags('User')
@Controller('user')
@UseGuards(LocalAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ type: UserResponseDto })
  async getUser(@Request() request: { user_id: string }): Promise<User> {
    const { user_id } = request;
    return this.usersService.getUser(user_id);
  }

  @Delete()
  @ApiResponse({ status: 204 })
  async deleteUser(@Request() request: { user_id: string }): Promise<void> {
    const { user_id } = request;
    return this.usersService.deleteUser(user_id);
  }

  @Patch('username')
  @ApiResponse({ type: UserResponseDto })
  async updateUsername(
    @Request() request: { user_id: string },
    @Body() { username }: UserRequestDto,
  ): Promise<UserResponseDto> {
    const { user_id } = request;
    return this.usersService.updateUsername(user_id, username);
  }

  @Patch('password')
  @ApiResponse({ type: UserResponseDto })
  async updatePassword(
    @Request() request: { user_id: string },
    @Body() { password }: UserRequestDto,
  ): Promise<UserResponseDto> {
    const { user_id } = request;
    return this.usersService.updatePassword(user_id, password);
  }
}

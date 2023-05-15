import { Body, Controller, Delete, Get, Injectable, Patch, Post, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { TokenResponseDto, UserRequestDto, UserResponseDto } from './users.dto';
import { UsersService } from './users.service';

@Injectable()
@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  @ApiResponse({ type: UserResponseDto })
  async signUp(@Body() { username, password }: UserRequestDto): Promise<UserResponseDto> {
    return this.usersService.signUp({ username, password });
  }

  @Post('sign-in')
  @ApiResponse({ type: TokenResponseDto })
  async signIn(@Body() { username, password }: UserRequestDto): Promise<TokenResponseDto> {
    return this.usersService.signIn({ username, password });
  }

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

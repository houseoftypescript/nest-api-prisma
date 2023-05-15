import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenRequestDto, TokenResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Injectable()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiResponse({ type: TokenResponseDto })
  async signUp(@Body() { username, password }: TokenRequestDto): Promise<TokenResponseDto> {
    return this.authService.signUp({ username, password });
  }

  @Post('sign-in')
  @ApiResponse({ type: TokenResponseDto })
  async signIn(@Body() { username, password }: TokenRequestDto): Promise<TokenResponseDto> {
    return this.authService.signIn({ username, password });
  }
}

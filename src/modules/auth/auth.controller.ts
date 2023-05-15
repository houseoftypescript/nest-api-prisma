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
  async signUp(@Body() { email, username, password }: TokenRequestDto): Promise<TokenResponseDto> {
    return this.authService.signUp({ email, username, password });
  }

  @Post('sign-in')
  @ApiResponse({ type: TokenResponseDto })
  async signIn(@Body() { email, username, password }: TokenRequestDto): Promise<TokenResponseDto> {
    return this.authService.signIn({ email, username, password });
  }
}

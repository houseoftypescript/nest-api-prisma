import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from './health.dto';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiResponse({ type: HealthResponseDto })
  getHealth(): HealthResponseDto {
    return this.healthService.getHealth();
  }
}

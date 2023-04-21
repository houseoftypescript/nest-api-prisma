import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../health.controller';
import { HealthService } from '../health.service';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const health: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = health.get<HealthController>(HealthController);
  });

  describe('/health', () => {
    it('should return status OK', async () => {
      const response = healthController.getHealth();
      expect(response).toEqual({ status: 'OK' });
    });
  });
});

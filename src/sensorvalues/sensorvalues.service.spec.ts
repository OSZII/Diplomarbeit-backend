import { Test, TestingModule } from '@nestjs/testing';
import { SensorvaluesService } from './sensorvalues.service';

describe('SensorvaluesService', () => {
  let service: SensorvaluesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorvaluesService],
    }).compile();

    service = module.get<SensorvaluesService>(SensorvaluesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

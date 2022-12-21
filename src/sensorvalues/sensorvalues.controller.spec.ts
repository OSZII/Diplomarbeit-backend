import { Test, TestingModule } from '@nestjs/testing';
import { SensorvaluesController } from './sensorvalues.controller';
import { SensorvaluesService } from './sensorvalues.service';

describe('SensorvaluesController', () => {
  let controller: SensorvaluesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorvaluesController],
      providers: [SensorvaluesService],
    }).compile();

    controller = module.get<SensorvaluesController>(SensorvaluesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

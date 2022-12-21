import { Module } from '@nestjs/common';
import { SensorvaluesService } from './sensorvalues.service';
import { SensorvaluesController } from './sensorvalues.controller';

@Module({
  controllers: [SensorvaluesController],
  providers: [SensorvaluesService]
})
export class SensorvaluesModule {}

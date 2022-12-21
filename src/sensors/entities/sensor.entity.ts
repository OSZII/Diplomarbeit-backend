import { ApiProperty } from '@nestjs/swagger';
import { Sensor, SensorType } from '@prisma/client';

export class SensorEntity implements Sensor {
  @ApiProperty()
  id: string;
  @ApiProperty()
  type: SensorType;
  @ApiProperty()
  fieldId: string;
}

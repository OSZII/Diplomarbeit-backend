import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from '@prisma/client';

export class SensorEntity implements Sensor {
  @ApiProperty()
  id: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  fieldId: string;
}

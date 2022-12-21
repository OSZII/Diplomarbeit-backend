import { ApiProperty } from '@nestjs/swagger';

export class SensorvalueEntity {
  @ApiProperty()
  value: string;
  @ApiProperty()
  timeStamp: Date;
  @ApiProperty()
  sensorId: string;
}

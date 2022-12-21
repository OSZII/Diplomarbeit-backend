import { ApiProperty } from '@nestjs/swagger';
import { SensorValue } from '@prisma/client';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateSensorvalueDto implements SensorValue {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  value: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  timeStamp: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sensorId: string;
}

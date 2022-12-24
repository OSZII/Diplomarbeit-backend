import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

enum SensorType {
  'humidity',
  'temperature',
  'light',
  'carbon_dioxide',
  'soil_moisture',
  'soil_ph',
  'wind_speed_direction',
  'precipitation',
}

export class CreateSensorDto {
  @ApiProperty()
  @IsEnum(SensorType)
  type: string;

  @ApiProperty()
  @IsUUID()
  fieldId: string;
}

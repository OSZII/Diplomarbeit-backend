import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export enum SensorType {
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
  @IsOptional()
  @IsUUID()
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsEnum(SensorType)
  type: string;

  @ApiProperty()
  @IsUUID()
  fieldId: string;
}

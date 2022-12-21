import { ApiProperty } from '@nestjs/swagger';
import { SensorType } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty()
  @ApiProperty()
  type: SensorType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fieldId: string;
}

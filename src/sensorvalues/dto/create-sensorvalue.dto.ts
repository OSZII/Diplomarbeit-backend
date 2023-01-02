import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSensorvalueDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  value: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  timeStamp: Date;

  @ApiProperty()
  @IsUUID()
  sensorId: string;
}

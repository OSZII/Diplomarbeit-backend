import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateSensorvalueDto {
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

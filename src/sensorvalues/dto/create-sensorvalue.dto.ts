import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateSensorvalueDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  value: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  timeStamp: Date;

  @ApiProperty()
  @IsUUID()
  sensorId: string;
}

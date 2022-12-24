import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSensorvalueDto {
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
  @Length(36)
  sensorId: string;
}

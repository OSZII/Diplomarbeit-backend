import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(36)
  fieldId: string;
}

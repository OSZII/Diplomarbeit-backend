import { ApiProperty } from '@nestjs/swagger';
import { Prisma, AreaUnit } from '@prisma/client';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  area: number;

  @IsNotEmpty()
  @ApiProperty()
  unit: AreaUnit;

  @IsNumber()
  @IsNotEmpty()
  @IsLatitude()
  @ApiProperty()
  latitude: Prisma.Decimal;

  @IsNumber()
  @IsNotEmpty()
  @IsLongitude()
  @ApiProperty()
  longitude: Prisma.Decimal;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}

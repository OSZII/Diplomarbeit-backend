import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';

enum unit {
  'sqm',
  'sqk',
  'hectar',
  'ar',
  'acre',
}

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
  @IsEnum(unit)
  @ApiProperty()
  unit: string;

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

  @IsUUID()
  @ApiProperty()
  userId: string;
}

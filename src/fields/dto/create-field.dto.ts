import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';

export enum unit {
  sqm,
  sqk,
  hectar,
  ar,
  acre,
}

export class CreateFieldDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
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

  @IsOptional()
  @IsLatitude()
  @ApiProperty()
  latitude: Prisma.Decimal;

  @IsOptional()
  @IsLongitude()
  @ApiProperty()
  longitude: Prisma.Decimal;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsUUID()
  @ApiProperty()
  userId: string;
}

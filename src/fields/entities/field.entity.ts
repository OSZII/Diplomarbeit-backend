import { AreaUnit, Field } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { ApiProperty } from '@nestjs/swagger';

export class FieldEntity implements Field {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  area: number;
  @ApiProperty()
  unit: AreaUnit;
  @ApiProperty()
  latitude: Decimal;
  @ApiProperty()
  longitude: Decimal;
  @ApiProperty()
  description: string;
  @ApiProperty()
  userId: string;
}

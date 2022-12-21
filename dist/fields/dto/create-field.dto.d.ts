import { Prisma, AreaUnit } from '@prisma/client';
export declare class CreateFieldDto {
    name: string;
    area: number;
    unit: AreaUnit;
    latitude: Prisma.Decimal;
    longitude: Prisma.Decimal;
    description: string;
    userId: string;
}

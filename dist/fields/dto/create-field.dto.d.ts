import { Prisma } from '@prisma/client';
export declare enum unit {
    sqm = 0,
    sqk = 1,
    hectar = 2,
    ar = 3,
    acre = 4
}
export declare class CreateFieldDto {
    id: string;
    name: string;
    area: number;
    unit: string;
    latitude: Prisma.Decimal;
    longitude: Prisma.Decimal;
    description: string;
    userId: string;
}

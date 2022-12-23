import { Prisma } from '@prisma/client';
export declare class CreateFieldDto {
    name: string;
    area: number;
    unit: string;
    latitude: Prisma.Decimal;
    longitude: Prisma.Decimal;
    description: string;
    userId: string;
}

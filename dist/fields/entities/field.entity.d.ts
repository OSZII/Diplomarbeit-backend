import { AreaUnit, Field } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
export declare class FieldEntity implements Field {
    id: string;
    name: string;
    area: number;
    unit: AreaUnit;
    latitude: Decimal;
    longitude: Decimal;
    description: string;
    userId: string;
}

import { Sensor } from '@prisma/client';
export declare class SensorEntity implements Sensor {
    id: string;
    type: string;
    fieldId: string;
}

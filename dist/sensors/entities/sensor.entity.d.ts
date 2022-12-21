import { Sensor, SensorType } from '@prisma/client';
export declare class SensorEntity implements Sensor {
    id: string;
    type: SensorType;
    fieldId: string;
}

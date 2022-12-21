import { SensorValue } from '@prisma/client';
export declare class CreateSensorvalueDto implements SensorValue {
    id: string;
    value: string;
    timeStamp: Date;
    sensorId: string;
}

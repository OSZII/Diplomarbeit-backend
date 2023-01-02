import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
export declare class SensorsService {
    getSensorTypes(): {
        sensorTypes: string[];
    };
    findFieldById(id: any): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
    create(createSensorDto: CreateSensorDto): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
    getCount(): import(".prisma/client").PrismaPromise<number>;
    findAllDetailed(): import(".prisma/client").PrismaPromise<{
        type: string;
        sensorValues: {
            value: string;
            timeStamp: Date;
        }[];
        fieldId: string;
    }[]>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Sensor[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
    update(id: string, updateSensorDto: UpdateSensorDto): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
}

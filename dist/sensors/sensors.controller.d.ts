import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
export declare class SensorsController {
    private readonly sensorsService;
    constructor(sensorsService: SensorsService);
    create(createSensorDto: CreateSensorDto): Promise<import(".prisma/client").Sensor>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Sensor[]>;
    findAllDetailed(): import(".prisma/client").PrismaPromise<{
        type: string;
        sensorValues: {
            value: string;
            timeStamp: Date;
        }[];
        fieldId: string;
    }[]>;
    getAllSensortypes(): {
        sensorTypes: string[];
    };
    getSensorCount(): Promise<{
        count: number;
    }>;
    findOne(id: string): Promise<import(".prisma/client").Sensor>;
    update(id: string, updateSensorDto: UpdateSensorDto): Promise<import(".prisma/client").Sensor>;
    remove(id: string): Promise<import(".prisma/client").Sensor>;
}

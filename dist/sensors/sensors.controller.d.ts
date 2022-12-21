import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
export declare class SensorsController {
    private readonly sensorsService;
    constructor(sensorsService: SensorsService);
    create(createSensorDto: CreateSensorDto): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Sensor[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
    update(id: string, updateSensorDto: UpdateSensorDto): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
}

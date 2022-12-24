import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
export declare class SensorsService {
    findFieldById(id: any): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
    create(createSensorDto: CreateSensorDto): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Sensor[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
    update(id: string, updateSensorDto: UpdateSensorDto): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__SensorClient<import(".prisma/client").Sensor, never>;
}

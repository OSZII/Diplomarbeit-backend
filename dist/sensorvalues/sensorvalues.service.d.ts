import { CreateSensorvalueDto } from './dto/create-sensorvalue.dto';
import { UpdateSensorvalueDto } from './dto/update-sensorvalue.dto';
export declare class SensorvaluesService {
    create(createSensorvalueDto: CreateSensorvalueDto): import(".prisma/client").Prisma.Prisma__SensorValueClient<import(".prisma/client").SensorValue, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").SensorValue[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__SensorValueClient<import(".prisma/client").SensorValue, never>;
    update(id: string, updateSensorvalueDto: UpdateSensorvalueDto): import(".prisma/client").Prisma.Prisma__SensorValueClient<import(".prisma/client").SensorValue, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__SensorValueClient<import(".prisma/client").SensorValue, never>;
}

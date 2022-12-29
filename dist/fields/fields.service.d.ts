import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
export declare class FieldsService {
    getUnits(): {
        units: string[];
    };
    findAllDetailed(): import(".prisma/client").PrismaPromise<{
        id: string;
        name: string;
        area: number;
        unit: string;
        latitude: import("@prisma/client/runtime").Decimal;
        longitude: import("@prisma/client/runtime").Decimal;
        description: string;
        sensors: {
            id: string;
            type: string;
            sensorValues: {
                id: string;
                value: string;
                timeStamp: Date;
            }[];
        }[];
    }[]>;
    getCount(): import(".prisma/client").PrismaPromise<number>;
    create(createFieldDto: CreateFieldDto): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Field[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
    findUserById(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    update(id: string, updateFieldDto: UpdateFieldDto): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
}

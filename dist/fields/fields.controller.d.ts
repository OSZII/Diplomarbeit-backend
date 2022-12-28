import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
export declare class FieldsController {
    private readonly fieldsService;
    constructor(fieldsService: FieldsService);
    create(createFieldDto: CreateFieldDto): Promise<import(".prisma/client").Field>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Field[]>;
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
    findOne(id: string): Promise<import(".prisma/client").Field>;
    update(id: string, updateFieldDto: UpdateFieldDto): Promise<import(".prisma/client").Field>;
    remove(id: string): Promise<import(".prisma/client").Field>;
}

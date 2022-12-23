import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
export declare class FieldsController {
    private readonly fieldsService;
    constructor(fieldsService: FieldsService);
    create(createFieldDto: CreateFieldDto): Promise<import(".prisma/client").Field>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Field[]>;
    findOne(id: string): Promise<import(".prisma/client").Field>;
    update(id: string, updateFieldDto: UpdateFieldDto): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
}

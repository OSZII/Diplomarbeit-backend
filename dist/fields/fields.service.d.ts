import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
export declare class FieldsService {
    create(createFieldDto: CreateFieldDto): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Field[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
    findUserById(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    update(id: string, updateFieldDto: UpdateFieldDto): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__FieldClient<import(".prisma/client").Field, never>;
}

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    findAllDetailed(): import(".prisma/client").PrismaPromise<(import(".prisma/client").User & {
        fields: (import(".prisma/client").Field & {
            sensors: import(".prisma/client").Sensor[];
        })[];
    })[]>;
    create(createUserDto: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    getCount(): import(".prisma/client").PrismaPromise<number>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    findByUsername(username: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    update(id: string, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
}

import { Role } from '@prisma/client';
export declare class CreateUserDto {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

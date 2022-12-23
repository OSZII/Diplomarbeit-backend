import { User } from '@prisma/client';
export declare class UserEntity implements User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return prisma.user.findMany();
  }

  findOne(id: string) {
    return prisma.user.findFirst({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}

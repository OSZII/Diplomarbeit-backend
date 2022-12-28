import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  findAllDetailed() {
    return prisma.user.findMany({
      include: {
        fields: {
          include: {
            sensors: true,
          },
        },
      },
    });
  }
  create(createUserDto: CreateUserDto) {
    return prisma.user.create({ data: createUserDto });
  }

  getCount() {
    return prisma.user.count();
  }

  findAll() {
    return prisma.user.findMany();
  }

  findOne(id: string) {
    return prisma.user.findFirst({ where: { id } });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}

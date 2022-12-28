import { Inject, Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
const prisma = new PrismaClient();

@Injectable()
export class FieldsService {
  findAllDetailed() {
    return prisma.field.findMany({
      select: {
        id: true,
        name: true,
        area: true,
        unit: true,
        latitude: true,
        longitude: true,
        description: true,
        sensors: {
          select: {
            id: true,
            type: true,
            sensorValues: {
              select: {
                id: true,
                value: true,
                timeStamp: true,
              },
            },
          },
        },
      },
    });
  }
  create(createFieldDto: CreateFieldDto) {
    return prisma.field.create({ data: createFieldDto });
  }

  findAll() {
    return prisma.field.findMany();
  }

  findOne(id: string) {
    return prisma.field.findFirst({ where: { id } });
  }

  findUserById(id: string) {
    return prisma.user.findFirst({ where: { id } });
  }

  update(id: string, updateFieldDto: UpdateFieldDto) {
    return prisma.field.update({ where: { id }, data: updateFieldDto });
  }

  remove(id: string) {
    return prisma.field.delete({ where: { id } });
  }
}

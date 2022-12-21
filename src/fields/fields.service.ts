import { Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class FieldsService {
  create(createFieldDto: CreateFieldDto) {
    return prisma.field.create({ data: createFieldDto });
  }

  findAll() {
    return prisma.field.findMany();
  }

  findOne(id: string) {
    return prisma.field.findFirst({ where: { id } });
  }

  update(id: string, updateFieldDto: UpdateFieldDto) {
    return prisma.field.update({ where: { id }, data: updateFieldDto });
  }

  remove(id: string) {
    return prisma.field.delete({ where: { id } });
  }
}

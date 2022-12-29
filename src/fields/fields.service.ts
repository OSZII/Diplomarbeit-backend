import { Injectable } from '@nestjs/common';
import { CreateFieldDto, unit } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { PrismaClient } from '@prisma/client';
import { isNumber } from 'class-validator';
const prisma = new PrismaClient();

@Injectable()
export class FieldsService {
  getUnits() {
    // Doing some magic to go from this:
    //     "units": [
    //         "sqm",
    //         "sqk",
    //         "hectar",
    //         "ar",
    //         "acre",
    //         0,
    //         1,
    //         2,
    //         3,
    //         4
    //     ]
    // ```
    // to this:
    // "units": [
    //     "sqm",
    //     "sqk",
    //     "hectar",
    //     "ar",
    //     "acre"
    // ]

    let unitsArr: string[] = [];
    for (let i = 0; i < Object.values(unit).length; i++) {
      if (!isNumber(Object.values(unit)[i]))
        unitsArr.push(Object.values(unit)[i] as string);
    }
    return {
      units: unitsArr,
    };
  }

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

  getCount() {
    return prisma.field.count();
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

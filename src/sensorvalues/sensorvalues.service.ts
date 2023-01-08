import { Injectable } from '@nestjs/common';
import { CreateSensorvalueDto } from './dto/create-sensorvalue.dto';
import { UpdateSensorvalueDto } from './dto/update-sensorvalue.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class SensorvaluesService {
  findAllDetailed() {
    return prisma.sensorValue.findMany({
      select: {
        Sensor: {
          select: {
            field: {
              select: {
                id: true,
                userId: true,
              },
            },
          },
        },
        timeStamp: true,
        value: true,
        sensorId: true,
      },
      take: 100, // limits to 100 TODO: implement pagination with a paramter or somethin like that
    });
  }
  sensorValuesBySensorId(id: string) {
    return prisma.sensorValue.findMany({ where: { sensorId: id } });
  }
  findSensorById(id: string) {
    return prisma.sensor.findFirst({ where: { id } });
  }
  create(createSensorvalueDto: CreateSensorvalueDto) {
    return prisma.sensorValue.create({ data: createSensorvalueDto });
  }

  findAll() {
    return prisma.sensorValue.findMany();
  }

  findOne(id: string) {
    return prisma.sensorValue.findFirst({ where: { id } });
  }

  update(id: string, updateSensorvalueDto: UpdateSensorvalueDto) {
    return prisma.sensorValue.update({
      where: { id },
      data: updateSensorvalueDto,
    });
  }

  remove(id: string) {
    return prisma.sensorValue.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateSensorDto, SensorType } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { PrismaClient } from '@prisma/client';
import { isNumber } from 'class-validator';
const prisma = new PrismaClient();

@Injectable()
export class SensorsService {
  getSensorTypes() {
    let sensorsArr: string[] = [];
    for (let i = 0; i < Object.values(SensorType).length; i++) {
      if (!isNumber(Object.values(SensorType)[i]))
        sensorsArr.push(Object.values(SensorType)[i] as string);
    }
    return {
      sensorTypes: sensorsArr,
    };
  }

  findFieldById(id: any) {
    return prisma.field.findFirst({ where: { id } });
  }
  create(createSensorDto: CreateSensorDto) {
    return prisma.sensor.create({ data: createSensorDto });
  }

  getCount() {
    return prisma.sensor.count();
  }

  findAllDetailed() {
    return prisma.sensor.findMany({
      select: {
        fieldId: true,
        name: true,
        type: true,
        sensorValues: {
          select: {
            timeStamp: true,
            value: true,
          },
        },
      },
    });
  }

  findAll() {
    return prisma.sensor.findMany();
  }

  findOne(id: string) {
    return prisma.sensor.findFirst({ where: { id } });
  }

  update(id: string, updateSensorDto: UpdateSensorDto) {
    return prisma.sensor.update({ where: { id }, data: updateSensorDto });
  }

  remove(id: string) {
    return prisma.sensor.delete({ where: { id } });
  }
}

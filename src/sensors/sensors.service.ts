import { Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class SensorsService {
  create(createSensorDto: CreateSensorDto) {
    return prisma.sensor.create({ data: createSensorDto });
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

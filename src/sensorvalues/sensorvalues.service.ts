import { Injectable } from '@nestjs/common';
import { CreateSensorvalueDto } from './dto/create-sensorvalue.dto';
import { UpdateSensorvalueDto } from './dto/update-sensorvalue.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class SensorvaluesService {
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

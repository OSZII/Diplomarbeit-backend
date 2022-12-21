import { Prisma, PrismaClient } from "@prisma/client";
import { SensorValueModel } from "../prisma/zod";
const prisma = new PrismaClient();

export class SensorValue {
  static async create(
    sensorValue:
      | Prisma.SensorValueCreateInput
      | Prisma.SensorValueUncheckedCreateInput
  ): Promise<SensorValue> {
    if (SensorValueModel.safeParse(sensorValue).success) {
      return await prisma.sensorValue.create({ data: sensorValue });
    }
    return `Validation failed for creating ${this.name} Object`;
  }

  static async count(): Promise<number> {
    return await prisma.sensorValue.count();
  }

  static async getAll(): Promise<SensorValue[]> {
    return await prisma.sensorValue.findMany();
  }

  static async get(id: string): Promise<SensorValue | null> {
    return await prisma.sensorValue.findFirst({
      where: {
        id: id,
      },
    });
  }

  static async update(
    sensorValue: Prisma.SensorValueCreateInput
  ): Promise<SensorValue> {
    return await prisma.sensorValue.update({
      where: { id: sensorValue.id },
      data: sensorValue,
    });
  }

  static async delete(id: string): Promise<SensorValue> {
    return await prisma.sensorValue.delete({ where: { id: id } });
  }
}

import { Prisma, PrismaClient } from "@prisma/client";
import { SensorModel } from "../prisma/zod";
const prisma = new PrismaClient();

export class Sensor {
  static async create(sensor: Prisma.SensorCreateInput): Promise<Sensor> {
    if (SensorModel.safeParse(sensor).success) {
      return await prisma.sensor.create({ data: sensor });
    }
    return `Validation failed for creating ${this.name} Object`;
  }

  static async count(): Promise<number> {
    return await prisma.sensor.count();
  }

  static async getAll(): Promise<Sensor[]> {
    return await prisma.sensor.findMany();
  }

  static async get(id: string): Promise<Sensor | null> {
    return await prisma.sensor.findFirst({ where: { id: id } });
  }

  static async update(sensor: Prisma.SensorCreateInput): Promise<Sensor> {
    return await prisma.sensor.update({ where: { id: sensor.id }, data: {} });
  }

  static async delete(id: string): Promise<Sensor> {
    return await prisma.sensor.delete({ where: { id: id } });
  }
}

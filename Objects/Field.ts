import { PrismaClient, Prisma } from "@prisma/client";
import { FieldModel } from "../prisma/zod";
const prisma = new PrismaClient();

export class Field {
  static async create(
    field: Prisma.FieldCreateInput | Prisma.FieldUncheckedCreateInput
  ): Promise<Field> {
    if (FieldModel.safeParse(field).success) {
      return await prisma.field.create({ data: field });
    }
    return `Validation failed for creating ${this.name} Object`;
  }

  static async count(): Promise<number> {
    return await prisma.field.count();
  }

  static async getAll(): Promise<Field[]> {
    return await prisma.field.findMany();
  }

  static async get(id: string): Promise<Field | null> {
    return await prisma.field.findFirst({ where: { id: id } });
  }

  static async getByName(name: string) {
    return await prisma.field.findMany({
      where: { name: { contains: name } },
    });
  }

  static async update(
    field: Prisma.FieldUpdateInput | Prisma.FieldUncheckedUpdateInput
  ): Promise<Field> {
    return await prisma.field.update({
      where: { id: field.id?.toString() },
      data: field,
    });
  }

  static async delete(id: string): Promise<Field> {
    try {
      return await prisma.field.delete({ where: { id: id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return "Error: " + e.code;
      } else {
        return `Error deleteing Field`;
      }
    }
  }
}

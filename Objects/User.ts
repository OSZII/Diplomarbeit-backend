import { PrismaClient, Prisma } from "@prisma/client";
import { UserModel } from "../prisma/zod";
const prisma = new PrismaClient();

export class User {
  static async create(
    user: Prisma.UserCreateInput | Prisma.UserUncheckedCreateInput
  ): Promise<User> {
    if (UserModel.safeParse(user).success) {
      return await prisma.user.create({ data: user });
    }
    return `Validation failed for creating ${this.name} Object`;
  }

  static async count(): Promise<number> {
    return await prisma.user.count();
  }

  static async getAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  static async get(id: string): Promise<User | null> {
    return await prisma.user.findFirst({ where: { id: id } });
  }

  static async getByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email: email },
    });
  }

  static async update(
    user: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput
  ): Promise<User> {
    return await prisma.user.update({
      where: { id: user.id?.toString() },
      data: user,
    });
  }

  static async delete(id: string): Promise<User> {
    try {
      return await prisma.user.delete({ where: { id: id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return "Error: " + e.code;
      } else {
        return `Error deleteing User`;
      }
    }
  }
}

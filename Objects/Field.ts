// import { FieldModel } from "../prisma/zod";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();
import * as z from "zod";

enum AreaUnit {
  sqm = "sqm",
  hectar = "hectar",
  acre = "acre",
  sqk = "sqk",
}

const FieldValidationModelForCreate = z.object({
  name: z.string(),
  area: z.number().int(),
  unit: z.nativeEnum(AreaUnit),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  description: z.string().nullish(),
});

const FieldValidationModelForUpdate = z.object({
  id: z.string(),
  name: z.string(),
  area: z.number().int(),
  unit: z.nativeEnum(AreaUnit),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  description: z.string().nullish(),
});

type FieldProps = {
  id?: number;
  name: string;
  area: number;
  unit: AreaUnit;
  latitude?: number;
  longitude?: number;
  description?: string;
};

export class Field {
  static async create(field: FieldProps): Promise<Field> {
    // let createdField: Field = await prisma.field.create({
    //   data: {
    //     name: field.name,
    //     area: field.area,
    //     unit: field.unit,
    //     latitude: field.latitude,
    //     longitude: field.longitude,
    //     description: field.description,
    //   },
    // });
    let createdField: Field = await prisma.field.create({
      data: { field },
    });
    return createdField;
  }

  //   static async getAll(): Promise<Field[]> {
  //     let conn = await pool.getConnection();
  //     let sql = "SELECT * FROM fields;";
  //     let results = await conn.query(sql);
  //     conn.end();
  //     return results;
  //   }

  //   static async get(id: number): Promise<Field> {
  //     let conn = await pool.getConnection();
  //     let sql = "SELECT * FROM fields WHERE id = ?;";
  //     let result = await conn.query(sql, [id]);
  //     conn.end();
  //     return result;
  //   }

  // static async getByName(name) { Not unique
  //     let conn = await pool.getConnection();
  //     let sql = `SELECT * FROM fields WHERE name LIKE CONCAT('%', ?, '%');`;
  //     let results = await conn.query(sql, [name]);
  //     conn.end();
  //     return results;
  // }

  //   static async update(field: Field) {
  //     let conn = await pool.getConnection();
  //     let sql = `UPDATE fields SET name = ?, area = ?, unit = ? latitude = ?, longitude = ?, description = ? WHERE id = ?`;
  //     let result = await conn.query(sql, [
  //       field.name,
  //       field.area,
  //       field.unit,
  //       field.latitude,
  //       field.longitude,
  //       field.description,
  //       field.id,
  //     ]);
  //     conn.end();
  //     return result;
  //   }

  //   static async delete(id: number) {
  //     let conn = await pool.getConnection();
  //     let sql = "DELETE FROM fields WHERE id = ?;";
  //     let result = await conn.query(sql, [id]);
  //     conn.end();
  //     return result;
  //   }
}

Field.create({
  name: "test",
  area: 200,
  unit: AreaUnit.acre,
  description: "a basic Field",
}).then((data) => console.log(data));

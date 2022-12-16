// import { FieldModel } from "../prisma/zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as z from "zod";

const pool = require("../Database/database");

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

export class Field {
  id?: number;
  name: string;
  area: number;
  unit: AreaUnit | undefined;
  latitude?: number;
  longitude?: number;
  description?: string;

  constructor(field: Field) {
    // validation
    if (!FieldValidationModelForCreate.safeParse(field).success) {
      console.log("Validation failed provide correct data!");
      return;
    }
    this.name = field.name;
    this.area = field.area;
    this.unit = field.unit;
    this.latitude = field.latitude;
    this.longitude = field.longitude;
    this.description = field.description;
  }

  async create(field: Field): Promise<Field> {
    let createdField: Field = await prisma.field.create({
      data: {
        name: field.name,
        area: field.area,
        unit: field.unit,
        latitude: field.latitude,
        longitude: field.longitude,
        description: field.description,
      },
    });
    // let result = await conn.query(sql, [
    //   field.name,
    //   field.area,
    //   field.unit,
    //   field.latitude,
    //   field.longitude,
    //   field.description,
    // // ]);
    // return result;
  }

  static async getAll(): Promise<Field[]> {
    let conn = await pool.getConnection();
    let sql = "SELECT * FROM fields;";
    let results = await conn.query(sql);
    conn.end();
    return results;
  }

  static async get(id: number): Promise<Field> {
    let conn = await pool.getConnection();
    let sql = "SELECT * FROM fields WHERE id = ?;";
    let result = await conn.query(sql, [id]);
    conn.end();
    return result;
  }

  // static async getByName(name) { Not unique
  //     let conn = await pool.getConnection();
  //     let sql = `SELECT * FROM fields WHERE name LIKE CONCAT('%', ?, '%');`;
  //     let results = await conn.query(sql, [name]);
  //     conn.end();
  //     return results;
  // }

  static async update(field: Field) {
    let conn = await pool.getConnection();
    let sql = `UPDATE fields SET name = ?, area = ?, unit = ? latitude = ?, longitude = ?, description = ? WHERE id = ?`;
    let result = await conn.query(sql, [
      field.name,
      field.area,
      field.unit,
      field.geoLocation.latitude,
      field.geoLocation.longitude,
      field.description,
      field.id,
    ]);
    conn.end();
    return result;
  }

  static async delete(id: number) {
    let conn = await pool.getConnection();
    let sql = "DELETE FROM fields WHERE id = ?;";
    let result = await conn.query(sql, [id]);
    conn.end();
    return result;
  }
}

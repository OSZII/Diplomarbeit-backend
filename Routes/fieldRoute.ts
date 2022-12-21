import express, { Express, Request, Response } from "express";
// import { FieldModel } from "../prisma/zod";
import { Field } from "../Objects/Field";
import { Prisma } from "@prisma/client";
import { notfound, validationFailed } from "../Helper/utility";
import { FieldModel } from "../prisma/zod";
// const Helper = require("../Helper/Helper");
// const handler = require("../Objects/FileHandler");

export const fieldRoute = express.Router();

// TODO: irgendwann einmal die download routen wieder hinzufügen

// #region GET Fields
fieldRoute.get("/", async (req: Request, res: Response) => {
  res.status(200).send(await Field.getAll());
});

fieldRoute.get("/:id", async (req: Request, res: Response) => {
  console.log("endpoint hit");

  let id: string = req.params.id; // uuid()

  let fieldById: Field | null = await Field.get(id);

  if (!fieldById) {
    notfound(res);
    return;
  }

  res.status(200).send(fieldById);
});

fieldRoute.post("/", async (req: Request, res: Response) => {
  let fieldBody: Prisma.FieldCreateInput = req.body;

  if (!FieldModel.safeParse(fieldBody).success) {
    validationFailed(res);
    return;
  }

  res.status(200).send(await Field.create(fieldBody));
});

fieldRoute.put("/:id", async (req: Request, res: Response) => {
  let id: string = req.params.id;

  let fieldById: null | Field = await Field.get(id);
  if (!fieldById) {
    notfound(res);
    return;
  }

  let fieldBody: Prisma.FieldUpdateInput = req.body;
  if (!FieldModel.safeParse(fieldBody)) {
    validationFailed(res);
    return;
  }

  fieldBody.id = id;
  res.status(200).send(await Field.update(fieldBody));
});

fieldRoute.delete("/:id", async (req: Request, res: Response) => {
  let id: string = req.params.id;

  let deletedField: string | Field = await Field.delete(id);
  //   if(typeof deletedField == )

  res.status(200).send(await Field.delete(id));
});

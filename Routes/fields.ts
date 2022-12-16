import express, { Express, Request, Response } from "express"

const app = express.Router();

import { FieldModel } from "../prisma/zod";
import { Field } from "../Objects/Field";
const Helper = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");


const properties = [
    "name",
    "area",
    "unit",
    "country",
    "federalState",
    "postalCode",
    "street",
    "latitude",
    "longitude",
    "description"
];

let areaUnits = [
    "square meter",
    "square kilometer",
    "kilometer",
    "km",
    "square feet",
    "square foot",
    "acre",
    "hectar",
    "square yard"
];

// #region GET Fields
app.get("/", async (req: Request, res: Response) => {
    res.status(200).send(await Field.getAll());
})

app.get("/download", async (req: Request, res: Response) => {
    handler.createAndSendFile("fields", "csv", await Field.getAll(), res);
})

app.get("/:id", async (req: Request, res: Response, next) => {
    let id: any = req.params.id;

    if (isNaN(id)) { next(); return; }

    // validate id
    if (id < 0) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let fieldById: Field = await Field.get(id)
    if (!fieldById) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    res.status(200).send(fieldById);
})
// TODO evenetuell /fields/:name in /fields/search/name umschreiben 
// app.get("/:name", async (req: Request, res: Response) => {
//     let name = req.params.name;

//     if (name.length < 3) { res.status(400).send(Helper.LENGTH_ERROR); return; }

//     let foundFields = await field.getByName(name);
//     if (foundFields.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

//     res.status(200).send(foundFields);
// })

app.get("/:id/download", async (req: Request, res: Response, next) => {
    let id: any = req.params.id;

    if (isNaN(id)) { next(); return; }

    // validate id 
    if (id < 0) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let fieldById: Field = await Field.get(id);
    if (!fieldById) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    handler.createAndSendFile("field_" + id, "csv", fieldById, res);
})

// app.get("/:name/download", async (req: Request, res: Response) => {
//     let name: string = req.params.name;

//     if (name.length < 3) { res.status(400).send(Helper.LENGTH_ERROR); return; }

//     let foundFields = await Fi.getByName(name);
//     if (foundFields.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

//     handler.createAndSendFile("fields_" + name, "csv", foundFields, res);
// })

// #endregion

// #region POST Field
app.post("/", async (req: Request, res: Response) => {
    let fieldBody: Field = req.body;

    if (!Helper.checkProperties(properties, fieldBody)) { res.status(400).send(Helper.INVALID_PROPERTIES_ERROR); return; }

    // check if unit is valid
    if (!areaUnits.includes(fieldBody.unit)) { res.status(400).send(Helper.INVALID_UNIT_ERROR); return; }

    res.status(200).send(await Field.createField(fieldBody));
})
// #endregion

// #region PUT Field
app.put("/:id", async (req: Request, res: Response) => {
    let id: number = Number(req.params.id);

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let fieldById = await Field.get(id);
    if (!fieldById) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    // validate Body
    let fieldBody = req.body;
    if (!Helper.checkProperties(properties, fieldBody)) { res.status(400).send(Helper.INVALID_PROPERTIES_ERROR); return; }

    // check if unit is valid
    if (!areaUnits.includes(fieldBody.unit)) { res.status(400).send(Helper.INVALID_UNIT_ERROR); return; }

    fieldBody.id = id;
    res.status(200).send(await Field.update(fieldBody));

})
// #endregion

// #region DELETE Field
app.delete("/:id", async (req: Request, res: Response) => {
    let id: number = Number(req.params.id);

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let fieldById: Field = await Field.get(id);
    if (!fieldById) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    res.status(200).send(await Field.delete(id));
})
// #endregion


module.exports = app;
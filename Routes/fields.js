const express = require("express");
const app = express.Router();

const field = require("../Objects/Field");
const { Helper, checkProperties, INVALID_PROPERTIES_ERROR, ID_ERROR, NOTHING_FOUND_ERROR } = require("../Helper/Helper");
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
app.get("/", async (req, res) => {
    res.status(200).send(await field.getAll());
})

app.get("/download", async (req, res) => {
    handler.createAndSendFile("fields", "csv", await field.getAll(), res);
})

app.get("/:id", async (req, res, next) => {
    let id = req.params.id;

    if (isNaN(id)) { next(); return; }

    // validate id
    if (id < 0) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let fieldById = await field.getById(id);
    if (fieldById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    res.status(200).send(fieldById);
})

app.get("/:name", async (req, res) => {
    let name = req.params.name;

    if (name.length < 3) { res.status(400).send(Helper.LENGTH_ERROR); return; }

    let foundFields = await field.getByName(name);
    if (foundFields.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    res.status(200).send(foundFields);
})

app.get("/:id/download", async (req, res, next) => {
    let id = req.params.id;

    if (isNaN(id)) { next(); return; }

    // validate id 
    if (id < 0) { res.status(400).send(ID_ERROR); return; }

    // check if id exists
    let fieldById = await field.getById(id);
    if (fieldById.length == 0) { res.status(404).send(NOTHING_FOUND_ERROR); return; }

    handler.createAndSendFile("field_" + id, "csv", fieldById, res);
})

app.get("/:name/download", async (req, res) => {
    let name = req.params.name;

    if (name.length < 3) { res.status(400).send(Helper.LENGTH_ERROR); return; }

    let foundFields = await field.getByName(name);
    if (foundFields.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    handler.createAndSendFile("fields_" + name, "csv", foundFields, res);
})

// #endregion

// #region POST Field
app.post("/", async (req, res) => {
    let fieldBody = req.body;
    if (!checkProperties(properties, fieldBody)) { res.status(400).send(INVALID_PROPERTIES_ERROR); return; }

    // check if unit is valid
    if(!areaUnits.includes(fieldBody.unit)) { res.status(400).send(Helper.INVALID_UNIT_ERROR); return; }

    res.status(200).send(await field.createField(fieldBody));
})
// #endregion

// #region PUT Field
app.put("/:id", async (req, res) => {
    let id = req.params.id;

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let fieldById = await field.getById(id);
    if (fieldById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    // validate Body
    let fieldBody = req.body;
    if (!checkProperties(properties, fieldBody)) { res.status(400).send(Helper.INVALID_PROPERTIES_ERROR); return; }

    // check if unit is valid
    if(!areaUnits.includes(fieldBody.unit)) { res.status(400).send(Helper.INVALID_UNIT_ERROR); return; }

    fieldBody.id = id;
    res.status(200).send(await field.update(fieldBody, id));

})
// #endregion

// #region DELETE Field
app.delete("/:id", async (req, res) => {
    let id = req.params.id;

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let fieldById = await field.getById(id);
    if (fieldById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    res.status(200).send(await field.deleteById(id));
})
// #endregion


module.exports = app;
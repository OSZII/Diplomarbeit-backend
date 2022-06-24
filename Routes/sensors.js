const express = require("express");
const app = express.Router();

const sensor = require("../Objects/Sensor");
const field = require("../Objects/Field");
const { Helper, checkProperties, INVALID_PROPERTIES_ERROR, ID_ERROR, NOTHING_FOUND_ERROR} = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");

let properties = ["fieldId", "type", "locationOnField"];

// #region GET Sensors
app.get("/", async (req, res) => {
    res.status(200).send(await sensor.getAll());
});

app.get("/download", async (req, res) => {
    handler.createAndSendFile("sensors", "csv", await sensor.getAll(), res);
});

app.get("/:id", async (req, res) => {
    let id = req.params.id;

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let sensorById = await sensor.getById(id);
    if (sensorById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    res.status(200).send(await sensor.getById(id));
});

app.get("/:id/download", async (req, res) => {
    let id = req.params.id;

    if (id < 0 || isNaN(id)) { res.status(400).send(ID_ERROR); return; }

    // check if id exists
    let sensorById = await sensor.getById(id);
    if (sensorById.length == 0) { res.status(404).send(NOTHING_FOUND_ERROR); return; }

    handler.createAndSendFile("sensor_" + id, "csv", sensorById, res);
});

app.get("/fields/:id", async (req, res) => {
    let id = req.params.id;

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if field with id exists
    let fieldById = await field.getById(id);
    if (fieldById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    res.status(200).send(await sensor.getByFieldId(id));

})

app.get("/fields/:id/download", async (req, res) => {
    let id = req.params.id;

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if field with id exists
    let fieldById = await field.getById(id);
    if (fieldById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    handler.createAndSendFile("sensors_on_filed_with_id_" + id, "csv", await sensor.getByFieldId(id), res);
})

// #endregion

// #region POST Sensor
app.post("/", async (req, res) => {
    let sensorBody = req.body;
    if (!checkProperties(properties, sensorBody)) { res.status(400).send(INVALID_PROPERTIES_ERROR); return; }

    // check if fieldId exists
    let fieldById = await field.getById(sensorBody.fieldId);
    if (fieldById.length == 0) { res.status(404).send(Helper.INVALID_FOREIGNKEY_ERROR); return; }

    res.status(200).send(await sensor.createSensor(sensorBody));
});
// #endregion

// #region PUT Sensor
app.put("/:id", async (req, res) => {
    let id = req.params.id;
    let sensorBody = req.body;

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if fieldId exists
    let fieldById = await field.getById(sensorBody.fieldId);
    if (fieldById.length == 0) { res.status(404).send(Helper.INVALID_FOREIGNKEY_ERROR); return; }

    // check if id exists
    let sensorById = await sensor.getById(id);
    if (sensorById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    // validate Body
    if (!checkProperties(properties, sensorBody)) { res.status(400).send(Helper.INVALID_PROPERTIES_ERROR); return; }

    res.status(200).send(await sensor.update(sensorBody, id));
});
// #endregion

// #region DELETE Sensor
app.delete("/:id", async (req, res) => {
    let id = req.params.id;

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let sensorById = await sensor.getById(id);
    if (sensorById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    res.status(200).send(await sensor.deleteById(id));
});
// #endregion

module.exports = app;
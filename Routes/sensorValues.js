const express = require("express");
const app = express.Router();

const sensorValue = require("../Objects/SensorValue");
const { Helper, checkProperties, INVALID_PROPERTIES_ERROR, ID_ERROR, NOTHING_FOUND_ERROR } = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");

const properties = ["sensorId", "value", "timestamp"];



// #region GET SensorValues
app.get("/", async(req, res) => {
    res.status(200).send(await sensorValue.getAll());
})

app.get("/download", async(req, res) => {
    handler.createAndSendFile("sensorValues", "csv", await sensorValue.getAll(), res);
})

app.get("/:id", async(req, res) => {
    // validate id
    let id = req.params.id;
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }
    res.status(200).send(await sensorValue.getById(req.params.id));
})

app.get("/:id/download", async(req, res) => {
        let id = req.params.id;

        if (id < 0 || isNaN(id)) { res.status(400).send(ID_ERROR); return; }
        let sensorvalues = await sensorValue.getById(id);
        if (sensorValue.length == 0) { res.status(404).send(NOTHING_FOUND_ERROR); return; }

        handler.createAndSendFile("sensorValue_" + id, "csv", sensorvalues, res);
    })
    // #endregion

// #region POST SensorValues
app.post("/", async(req, res) => {
        let sensorValueBody = req.body;
        if (!checkProperties(properties, sensorValueBody)) { res.status(400).send(INVALID_PROPERTIES_ERROR); return; }

        res.send(await sensorValue.createSensorValue(sensorValueBody)).status(200);
    })
    // #endregion

// #region PUT SensorValues
app.put("/:id", async(req, res) => {
        let id = req.params.id;

        // validate id
        if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

        // check if id exists
        let sensorValueById = await sensorValue.getById(id);
        if (sensorValueById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

        // validate Body
        let sensorValueBody = req.body;
        if (!checkProperties(properties, sensorValueBody)) { res.status(400).send(Helper.INVALID_PROPERTIES_ERROR); return; }

        sensorValueBody.id = id;
        res.status(200).send(await sensorValue.update(sensorValueBody, id));

    })
    // #endregion

// #region DELETE SensorValue
app.delete("/:id", async(req, res) => {
        let id = req.params.id;

        // validate id
        if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

        // check if id exists
        let sensorValueById = await sensorValue.getById(id);
        if (sensorValueById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

        res.status(200).send(await sensorValue.deleteById(id));

    })
    // #endregion

module.exports = app;
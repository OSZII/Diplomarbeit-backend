const express = require("express");
const sensorValue = require("../Objects/SensorValue");
const app = express.Router();



// Gibt alle Sensoren zurück
app.get("/",async (req, res) => {
    res.status(200).send(await sensorValue.getAll())
})

app.get("/:id",async (req, res) => {
    res.status(200).send(await sensorValue.getById(req.params.id))
})

// erstellt einen oder mehrere neue Sensorwerte
app.post("/",async (req, res) => {
    if(req.body.hasOwnProperty("sensorValues")){
        res.status(200).send(await user.createMultipleSensorValues(req.body));
    }else {
        res.status(200).send(await user.createSensorValue(req.body));
    }
})

app.delete("/:id",async (req, res) => {
    res.status(200).send(await sensorValue.deleteById(req.params.id));
})


module.exports = app;
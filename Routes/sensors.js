const { response } = require("express");
const express = require("express");
const sensor = require("../Objects/Sensor");
const app = express.Router();

// Gibt alle Sensoren zurück
app.get("/",async (req, res) => {
    res.status(200).send(await sensor.getAll());
})

app.get("/type/:type",async (req,res) => {
    res.status(200).send(await sensor.getByType(req.params.type));
})

app.get("/:id",async (req, res) => {
    res.status(200).send(await sensor.getById(req.params.id));
})

// erstellt einen oder mehrere neue Sensoren
app.post("/",async (req, res) => {
    if(req.body.hasOwnProperty("sensors")){
        res.status(200).send(await user.createMultipleSensors(req.body));
    }else {
        res.status(200).send(await user.createSensor(req.body));
    }
})

app.delete("/:id",async (req, res) => {
    res.status(200).send(await sensor.deleteById(res.params.id));
})


module.exports = app;
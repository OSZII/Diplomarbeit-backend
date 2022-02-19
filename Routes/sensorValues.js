const express = require("express");
const sensorValue = require("../Objects/SensorValue");
const Help = require("../Helper/Helper");
const app = express.Router();

let objectProperties = [
    "sensorId",
    "value",
    "timestamp"
]

// Gibt alle Sensoren zurück
app.get("/",async (req, res) => {
    res.status(200).send(await sensorValue.getAll())
})

// get sensorValue by id
app.get("/:id",async (req, res) => {
    let id = req.params.id;
    if(!isNaN(id)){
        if(id > 0){
            let receivedSensorValue = await sensorValue.getById(id);
            if(receivedSensorValue.length != 0){
                res.status(200).send(receivedSensorValue);
            }else res.status(404).send(Help.notFound);
        }else res.status(400).send(Help.largerThanZero);
    }else res.status(400).send(Help.mustBeString);
})

// erstellt einen oder mehrere neue Sensorwerte
app.post("/",async (req, res) => {
    let sensorValues = req.body;
  if (Array.isArray(sensorValues)) {
    // validate if each object in array has all properties
    let result = true;
    for (let i = 0; i < sensorValues.length; i++) {
      result &=
        Help.hasOwnProperties(sensorValues[i], objectProperties) &
        Help.isNanArray([
          sensorValues[i].value,
          sensorValues[i].timestamp
        ]);
    }
    if (result) res.status(200).send(await sensorValue.createMultipleSensorValues(sensorValues));
    else res.status(400).send(Help.notAllProperties);
  } else {
    if (Help.hasOwnProperties(sensorValues, objectProperties)) {
      if (
        Help.isNanArray([
          sensorValues.value,
          sensorValues.timestamp
        ])
      ) {
        res.status(200).send(await sensorValue.createSensorValue(sensorValues));
      } else res.status(400).send("Properties must be string or null");
    } else res.status(400).send(Help.notAllProperties);
  }
})

app.delete("/:id",async (req, res) => {
    let id = req.params.id;
    if(!isNaN(id)){
        if(id > 0){
            let receivedSensorValue = await sensorValue.deleteById(id);
            if(receivedSensorValue.length != 0){
                res.status(200).send(await sensorValue.deleteById(id));
            } else res.status(404).send(Help.notFound);
        } else res.status(400).send(Help.largerThanZero);
    } else res.status(400).send(Help.notANumber);
})


module.exports = app;
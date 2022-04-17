const express = require("express");
const app = express.Router();

const validator = require("../Objects/Validator");
const SensorHandler = require("../Handler/Sensorhandler")
const sensor = require("../Objects/Sensor");
const Help = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");

const jwt = require("jsonwebtoken");

let objectProperties = [
    "fieldID",
    "type",
    "locationOnField"
  ];

  const sensorhandler = new SensorHandler(sensor, objectProperties)
  
  // Get all sensors
  app.get("/:parameters?/:downloadSpecific?", validator.verifyToken , async (req, res) => {
        let parameters = req.params.parameters; // erste Parameter
        let downloadSpecific = req.params.downloadSpecific; // zweiter Parameter
  
        try {
            let temp = parseInt(parameters);
            if(!isNaN(temp)) parameters = temp;
        } catch (error) {
          console.log("Parameter keine Number");
        }
  
        sensorhandler.setRes(res);

        switch (true) {
          case typeof parameters == "undefined":
            res.send(await sensor.getAll()).status(200);
            break;
          case parameters == "download":
            handler.createAndSendFile("sensors", "csv", await sensor.getAll());
            break;
          case typeof parameters === "number":
            sensorhandler.handleId(parameters, downloadSpecific)
            break;
          case parameters.includes("fields"):
            sensorhandler.handleByFieldId(parameters, downloadSpecific);
            break;
          default:
            sensorhandler.handleType(parameters, downloadSpecific)
            break;
        }
  });
  
  // Creates sensor
  app.post("/", validator.verifyToken , async (req, res) => {
    sensorhandler.setRes(res);
    let sensors = req.body;
        switch(true){
          case Object.keys(sensors).length == 0:
            res.send("Body can't be empty").status(400);
            break;
          default:
            console.log("single Sensor")
            sensorhandler.createSensor(sensors);
            break;
        }
  });
  
  app.put("/:id", validator.verifyToken, async (req, res) => {
    sensorhandler.setRes(res);
    let id = req.params.id;
    let sensors = req.body;
    if(typeof id == "undefined" || typeof sensors == "undefined"){
      res.send("Undefined id or body").status(400)
    } else {
      sensorhandler.updateSensor(sensors, id)
    }
  })
  
  app.delete("/:id", validator.verifyToken , async (req, res) => {
    sensorhandler.setRes(res);
    let id = req.params.id;
        sensorhandler.deleteSensorById(id);
  });


function setValues(parameters, downloadSpecific, res){
  sensorhandler.setParameters(parameters);
  sensorhandler.setDownloadSpecific(downloadSpecific);
  sensorhandler.setRes(res);
}

module.exports = app;
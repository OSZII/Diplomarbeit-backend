const express = require("express");
const app = express.Router();

const sensor = require("../Objects/Sensor");
const Help = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");

const jwt = require("jsonwebtoken");


let objectProperties = [
    "fieldID",
    "type",
    "locationOnField"
  ];
  

// Gibt alle Sensoren zurück
app.get("/:parameters?/:downloadSpecific?",verifyToken ,async (req, res) => {
  console.log("Sensors Requested")
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if(err) res.sendStatus(403);
    else{
      let parameters = req.params.parameters;
      let downloadSpecific = req.params.downloadSpecific;
      let sensors = await sensor.getAll();

      // create users.csv
      if (parameters == "download") {
        handler.createAndSendFile("sensors", "csv", sensors, res);
      } else if (parameters == undefined) {
        // userausgabe
        res.status(200).send(sensors);
      } else {
        if (!isNaN(parameters)) {
          // #region Suche nach user mit id
          let result = await Help.searchById(parameters, sensor);
            if(result[0].hasOwnProperty("id")){
              if (downloadSpecific == "download") {
              
                handler.createAndSendFile("sensor_with_id_" + parameters, "csv", result, res);
              
              } else res.status(200).send(result);
            } else res.status(result[0]).send(result[1]);
          // #endregion
        } else {
          // #region suche mit String
          let result = await Help.searchByType(parameters, sensor);
          if (result[0].hasOwnProperty("id")) {
            if (downloadSpecific == "download") {
              handler.createAndSendFile("sensors_with_" + parameters, "csv", result, res);
            } else res.status(200).send(result);
          } else {
            res.status(result[0]).send(result[1]);
          }
          // #endregion
        }
      }
    }
  })
})

// Get with id or type 
// app.get("/:idOrType",async (req,res) => {
//     let idOrType = req.params.idOrType;
//   if (!isNaN(idOrType)) {
//     if (idOrType > 0) {
//       let receivedSensor = await sensor.getById(idOrType);
//       if(receivedSensor.length != 0){
//         res
//           .status(200)
//           .send(receivedSensor);
//       } else res.status(404).send(Help.notFound);
//     } else res.status(400).send(Help.largerThanZero);
//   } else {
//     if (idOrType.length >= 3) {
//       let receivedSensor = await sensor.getByType(idOrType);
//       if(receivedSensor.length != 0){
//         res
//           .status(200)
//           .send(receivedSensor);
//       } else res.status(404).send(Help.notFound);
//     } else res.status(400).send(Help.longerThan + " 3");
//   }
// })

// erstellt einen oder mehrere neue Sensoren
app.post("/",verifyToken ,async (req, res) => {
  console.log("Sensor created")
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if(err) res.sendStatus(403);
    else{
      let sensors = req.body;
      if (Array.isArray(sensors)) {
        // validate if each object in array has all properties
        let result = true;
        for (let i = 0; i < sensors.length; i++) {
          result &=
            (
            Help.hasOwnProperties(sensors[i], objectProperties) &
            Help.isNanArray([
              sensors[i].type,
              sensors[i].locationOnField
                ]));
        }
    
        if (result) res.status(200).send(await sensor.createMultipleSensors(sensors));
        else res.status(400).send(Help.notAllProperties + " and country length max 2");
      } else {
        //   Single Object
        if (Help.hasOwnProperties(sensors, objectProperties)) {
          if (
            Help.isNanArray([
              sensors.type,
              sensors.locationOnField
            ])
          ) {
              res.status(200).send(await sensor.createSensor(sensors));
          } else
            res
              .status(400)
              .send(
                "Properties must be string(type, locationOnField)"
              );
        } else res.status(400).send(Help.notAllProperties);
      }
    }
  })
 
})

app.delete("/:id",verifyToken ,async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if(err) res.sendStatus(403);
    else{
      let id = req.params.id;
      if (!isNaN(id)) {
        if (id > 0) {
          let receivedSensor = await sensor.deleteById(id);
          if(receivedSensor.length != 0){
            res.status(200).send(receivedSensor);
          } else res.status(404).send(Help.notFound);
        } else res.status(400).send(Help.largerThanZero);
      } else res.status(400).send(Help.notANumber);
    }
  })
    // res.status(200).send(await sensor.deleteById(res.params.id));
})

// Verify Token
function verifyToken(req, res, next){
  // Get auth header value
  const brearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if(typeof brearerHeader !== "undefined"){
    // Token von bearer trennen
    const bearer = brearerHeader.split(" ");
    
    // Get token
    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();

  }else {
    // forbidden
    res.sendStatus(403)
  }
}

module.exports = app;
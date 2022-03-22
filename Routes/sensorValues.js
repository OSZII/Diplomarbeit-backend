const express = require("express");
const app = express.Router();

const sensorValue = require("../Objects/SensorValue");
const Help = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");

const jwt = require("jsonwebtoken");


let objectProperties = [
    "sensorId",
    "value",
    "timestamp"
]

// Gibt alle Sensoren zurück
app.get("/:parameters?/:downloadSpecific?",verifyToken ,async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if(err) res.sendStatus(403);
    else{
      let parameters = req.params.parameters;
      let downloadSpecific = req.params.downloadSpecific;
      let sensorValues = await sensorValue.getAll();

      // create users.csv
      if (parameters == "download") {
        handler.createAndSendFile("sensorValues", "csv", sensorValues, res);
      } else if (parameters == undefined) {
        // userausgabe
        res.status(200).send(sensorValues);
      } else {
        if (!isNaN(parameters)) {
          // #region Suche nach user mit id
          let result = await Help.searchById(parameters, sensorValue);
            if(result[0].hasOwnProperty("id")){
              if (downloadSpecific == "download") {
              
                handler.createAndSendFile("sensorValue_with_id_" + parameters, "csv", result, res);
              
              } else res.status(200).send(result);
            } else res.status(result[0]).send(result[1]);
          // #endregion
        } else {
          // // #region suche mit String
          // let result = await Help.searchByType(parameters, sensorValue);
          // if (result[0].hasOwnProperty("id")) {
          //   if (downloadSpecific == "download") {
          //     handler.createAndSendFile("sensorValues_with_" + parameters, "csv", result, res);
          //   } else res.status(200).send(result);
          // } else {
          //   res.status(result[0]).send(result[1]);
          // }
          // // #endregion
          res.status(400).send(Help.notANumber);
        }
      }
    }
  })
})

// erstellt einen oder mehrere neue Sensorwerte
app.post("/",verifyToken ,async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if(err) res.sendStatus(403);
    else{
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
    }
  })
})

app.delete("/:id",verifyToken ,async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if(err) res.sendStatus(403);
    else{
      let id = req.params.id;
      if(!isNaN(id)){
          if(id > 0){
              let receivedSensorValue = await sensorValue.deleteById(id);
              if(receivedSensorValue.length != 0){
                  res.status(200).send(await sensorValue.deleteById(id));
              } else res.status(404).send(Help.notFound);
          } else res.status(400).send(Help.largerThanZero);
      } else res.status(400).send(Help.notANumber);
    }
  })
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
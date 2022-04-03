const express = require("express");
const app = express.Router();

const Help = require("../Helper/Helper");
const field = require("../Objects/Field");
const auth = require("../Objects/Validator");

const jwt = require("jsonwebtoken");


const handler = require("../Objects/FileHandler");

const axios = require('axios').default;

let objectProperties = [
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

let GEO_API_KEY = process.env.GEO_API_KEY;
    // console.log((await getGeoData("AT","Tirol"))[0])

async function getGeoData(countryCode, federalState, postalCode, street){
    let url = `https://open.mapquestapi.com/geocoding/v1/address?key=${GEO_API_KEY}&location=${countryCode}+${federalState}+${postalCode}+${street}`;
    const response = await axios.get(url);
    let latitude = response.data.results[0].locations[0].latLng.lat;
    let longitude = response.data.results[0].locations[0].latLng.lng;
    return [latitude, longitude];
}

// Get all fields
app.get("/:parameters?/:downloadSpecific?",verifyToken , async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if(err) res.sendStatus(403);
    else{
      let parameters = req.params.parameters;
      let downloadSpecific = req.params.downloadSpecific;
      let fields = await field.getAll();

      // create users.csv
      if (parameters == "download") {
        handler.createAndSendFile("fields", "csv", fields, res);
      } else if (parameters == undefined) {
        // userausgabe
        res.status(200).send(fields);
      } else {
        if (!isNaN(parameters)) {
          // #region Suche nach user mit id
          let result = await Help.searchById(parameters, field);
            if(result[0].hasOwnProperty("id")){
              if (downloadSpecific == "download") {
              
                handler.createAndSendFile("field_with_id_" + parameters, "csv", result, res);
              
              } else res.status(200).send(result);
            } else res.status(result[0]).send(result[1]);
          // #endregion
        } else {
          // #region suche mit String
          let result = await Help.searchByString(parameters, field);
          if (result[0].hasOwnProperty("id")) {
            if (downloadSpecific == "download") {
              handler.createAndSendFile("fields_with_" + parameters, "csv", result, res);
            } else res.status(200).send(result);
          } else {
            res.status(result[0]).send(result[1]);
          }
          // #endregion
        }
      }  
    }
  })
});

// Creates field or multiple fields
app.post("/",verifyToken , async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if(err) res.sendStatus(403);
    else{
      console.log("post")
      let fields = req.body;
      if (Array.isArray(fields)) {
        // validate if each object in array has all properties
        let result = true;
        for (let i = 0; i < fields.length; i++) {
          result &= ( Help.hasOwnProperties(fields[i], objectProperties) &
            Help.isNanArray([
              fields[i].name,
              fields[i].unit,
              fields[i].country,
              fields[i].federalState,
              fields[i].description,
              fields[i].postalCode,
              fields[i].street          
                ]) &
            fields[i].country.length == 2);
            let geoData = (await getGeoData(fields[i].country, fields[i].federalState, fields[i].postalCode, fields[i].street));
            fields[i].latitude = geoData[0];
            fields[i].longitude = geoData[1];
        }
      
        if (result) res.status(200).send(await field.createMultipleFields(fields));
        else res.status(400).send(Help.notAllProperties + " and country length max 2");
      } else {
        //   Single Object
        if (Help.hasOwnProperties(fields, objectProperties)) {
          if (
            Help.isNanArray([
              fields.name,
              fields.unit,
              fields.country,
              fields.federalState,
              fields.street,
              fields.description
            ])
          ) {
            if (fields.country.length == 2) {
              console.log("country 2 lang")
              // let geoData = (await getGeoData(fields.country, fields.federalState, fields.postalCode, fields.street));
              fields.latitude = -1// geoData[0];
              fields.longitude = -1// geoData[1];
              res.status(200).send(await field.createField(fields));
            } else res.status(400).send("Countrycode length maximum 2");
          } else
            res.status(400).send("Properties must be string(name, unit, country, federalState, description)");
        } else res.status(400).send(Help.notAllProperties);
      }
    }
  })
});

app.delete("/:id",verifyToken , async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if(err) res.sendStatus(403);
    else{
      let id = req.params.id;
      if (!isNaN(id)) {
        if (id > 0) {
          let receivedField = await field.deleteById(id);
          if(receivedField.length != 0){
            res.status(200).send(receivedField);
          } else res.status(404).send(Help.notFound);
        } else res.status(400).send(Help.largerThanZero);
      } else res.status(400).send(Help.notANumber);
    }
  })
});

// app.delete("/", async (req, res) => {
//   // console.log("delete all")
//   res.status(200).send(await field.deleteAll());
// });

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

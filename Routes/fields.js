const express = require("express");
const app = express.Router();

const Help = require("../Helper/Helper");
const field = require("../Objects/Field");
const validator = require("../Objects/Validator");
const FieldHandler = require("../Handler/Fieldhandler")
const jwt = require("jsonwebtoken");
const handler = require("../Objects/FileHandler");

// const axios = require('axios').default;

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

const fieldhandler = new FieldHandler(field, objectProperties)

// let GEO_API_KEY = process.env.GEO_API_KEY;
//     // console.log((await getGeoData("AT","Tirol"))[0])

// async function getGeoData(countryCode, federalState, postalCode, street){
//     let url = `https://open.mapquestapi.com/geocoding/v1/address?key=${GEO_API_KEY}&location=${countryCode}+${federalState}+${postalCode}+${street}`;
//     const response = await axios.get(url);
//     let latitude = response.data.results[0].locations[0].latLng.lat;
//     let longitude = response.data.results[0].locations[0].latLng.lng;
//     return [latitude, longitude];
// }

// Get all fields
app.get("/:parameters?/:downloadSpecific?", validator.verifyToken , async (req, res) => {
      let parameters = req.params.parameters; // erste Parameter
      let downloadSpecific = req.params.downloadSpecific; // zweiter Parameter

      try {
          let temp = parseInt(parameters);
          if(!isNaN(temp)) parameters = temp;
      } catch (error) {
        console.log("Parameter keine Number");
      }

      switch (true) {
        case typeof parameters == "undefined":
          res.send(await field.getAll()).status(200);
          break;
        case parameters == "download":
          handler.createAndSendFile("fields", "csv", await field.getAll(), res);
          break;
        case typeof parameters === "number":
          fieldhandler.handleId(parameters, downloadSpecific, res)
          break;
        default:
          fieldhandler.handleName(parameters, downloadSpecific, res)
          break;
      }
});

// Creates field
app.post("/", validator.verifyToken , async (req, res) => {
  let fields = req.body;
      switch(true){
        case Object.keys(fields).length == 0:
          res.send("Body can't be empty").status(400);
          break;
        default:
          console.log("single Field")
          fieldhandler.createField(fields, res);
          break;
      }
});

app.put("/:id", validator.verifyToken, async (req, res) => {
  let id = req.params.id;
  let fields = req.body;
  if(typeof id == "undefined" || typeof fields == "undefined"){
    res.send("Undefined id or body").status(400)
  } else {
    fieldhandler.updateField(fields, id, res)
  }
})

app.delete("/:id", validator.verifyToken , async (req, res) => {
  let id = req.params.id;
      fieldhandler.deleteFieldById(id, res);
});

module.exports = app;

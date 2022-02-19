const express = require("express");
const field = require("../Objects/Field");
const app = express.Router();
const Help = require("../Helper/Helper");

let objectProperties = [
  "name",
  "area",
  "unit",
  "country",
  "federalState",
  "latitude",
  "longitude",
  "description"
];

// let API_KEY = process.env.GEO_API_KEY;


// Get all fields
app.get("/", async (req, res) => {
  res.status(200).send(await field.getAll());
});

// Get fields by name or id
app.get("/idOrName", async (req, res) => {
  let idOrName = req.params.idOrName;
  if (!isNaN(idOrName)) {
    if (idOrName > 0) {
      let receivedField = await field.getById(idOrName);
      if(receivedField.length != 0){
        res
          .status(200)
          .send(receivedField);
      } else res.status(404).send(Help.notFound);
    } else res.status(400).send(Help.largerThanZero);
  } else {
    // Namesearch
    if (idOrName.length >= 3) {
      let receivedField = await field.getByName(idOrName);
      if(receivedField.length != 0){
        res
        .status(200)
        .send(receivedField);
      } else res.status(404).send(Help.notFound);
    } else res.status(400).send(Help.longerThan + " 3");
  }
});

// Creates field or multiple fields
app.post("/", async (req, res) => {
  let fields = req.body;
  if (Array.isArray(fields)) {
    // validate if each object in array has all properties
    let result = true;
    for (let i = 0; i < fields.length; i++) {
      result &=
        (
        Help.hasOwnProperties(fields[i], objectProperties) &
        Help.isNanArray([
          fields[i].name,
          //   fields[i].area,
          fields[i].unit,
          fields[i].country,
          fields[i].federalState,
          //   fields[i].latitude,
          //   fields[i].longitude,
          fields[i].description,
            ]) &
        fields[i].country.length == 2);
    }

    if (result) res.status(200).send(await field.createMultipleFields(fields));
    else res.status(400).send(Help.notAllProperties + " and country length max 2");
  } else {
    //   Single Object
    if (Help.hasOwnProperties(fields, objectProperties)) {
      if (
        Help.isNanArray([
          fields.name,
          //   fields.area,
          fields.unit,
          fields.country,
          fields.federalState,
          //   fields.latitude,
          //   fields.longitude,
          fields.description,
        ])
      ) {
        if (fields.country.length == 2) {
          res.status(200).send(await field.createField(fields));
        } else res.status(400).send("Countrycode length maximum 2");
      } else
        res
          .status(400)
          .send(
            "Properties must be string(name, unit, country, federalState, description)"
          );
    } else res.status(400).send(Help.notAllProperties);
  }
});

app.delete("/:id", async (req, res) => {
  let id = req.params.id;
  if (!isNaN(id)) {
    if (id > 0) {
      let receivedField = await field.deleteById(id);
      if(receivedField.length != 0){
        res.status(200).send();
      } else res.status(404).send(Help.notFound);
    } else res.status(400).send(Help.largerThanZero);
  } else res.status(400).send(Help.notANumber);
});

// app.delete("/", async (req, res) => {
//   // console.log("delete all")
//   res.status(200).send(await field.deleteAll());
// });

module.exports = app;

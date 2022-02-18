const express = require("express");
const field = require("../Objects/Field");
const app = express.Router();

// Get all fields
app.get("/",async (req, res) => {
    res.status(200).send(await field.getAll());
})

// Get all fields that contain String in name
app.get("/name/:name",async (req, res) => {
    if(req.params.name) res.send(await field.getByName(req.params.name));
    else res.status(400).send("Required Parameters not given: name");
})

// Get fields by ID
app.get("/:id", async (req, res) => {
    if(req.params.id && !isNaN(req.params.id)) res.status(200).send(await field.getById(req.params.id));
    else res.status(400).send("Required Parameters not given: id");
})

// Creates field or multiple fields
app.post("/", async (req, res) => {
    let body = req.body;
    console.log(body)
    if(typeof body == "object"){
        if(req.body.hasOwnProperty("fields")){
            res.status(200).send(await field.createMultipleFields(req.body));
        }else{
            res.status(200).send(JSON.stringify(await field.createField(req.body)) + JSON.stringify(req.body), null, "\t");
        }
    }else res.status(400).send("Request Body not right format");  
})

app.delete("/:id", async (req, res) => {
    res.status(200).send(await field.deleteById(req.params.id))
})

app.delete("/",async (req, res) => {
    // console.log("delete all")
    res.status(200).send(await field.deleteAll());
})

module.exports = app;
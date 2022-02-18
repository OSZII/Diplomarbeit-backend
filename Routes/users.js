const express = require("express");
const user = require("../Objects/User");
const app = express.Router();

app.get("/", async (req, res) => {
    res.status(200).send(await user.getAll())
});

// Alle user die string in namen oder email enthalten
app.get("/name/:name", async (req, res) => {
    res.status(200).send(await user.getByName(req.params.name));
})

app.get("/:id", async (req, res) => {
    res.status(200).send(await user.getById(req.params.id));
})

// Passwörter werden vor dem versenden gehashed
app.post("/", async (req, res) => {
    if(req.body.hasOwnProperty("users")){
        res.status(200).send(await user.createMultipleUsers(req.body));
    }else {
        res.status(200).send(await user.createUser(req.body));
    }
})

app.delete("/:id", async (req, res) => {
    res.status(200).send(await user.deleteById(req.params.id));
})


module.exports = app;
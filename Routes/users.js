const express = require("express");
const user = require("../Objects/User");
const app = express.Router();

function hasOwnProperties(user, properties){
    let result = true;
    for(let i = 0; i < properties.length; i++){
        if(!user.hasOwnProperty(properties[i])){
            result = user.hasOwnProperty(properties[i]);
        }
    }

    return result;
}

app.get("/", async (req, res) => {
    res.status(200).send(await user.getAll())
});

// Alle user die string in namen oder email enthalten
app.get("/name/:name", async (req, res) => {
    let name = req.params.name;
    if(isNaN(name)){
        if(name.length >= 3) res.status(200).send(await user.getByName(name));
        else res.status(400).send("Parameter needs to be at least 3 Characters long");
    }else res.status(400).send("Parameter needs to be a string");
})

app.get("/:id", async (req, res) => {
    let id = req.params.id;
    if(!isNaN(id)){
        if(id > 0) res.status(200).send(await user.getById(id));
        else res.status(400).send("Parameter needs to be larger than 0"); 
    }else res.status(400).send("Parameter needs to be a number");
})

// Passwörter werden vor dem versenden gehashed
app.post("/", async (req, res) => {
    let users = req.body;
    if(users.hasOwnProperty("users")){
        res.status(200).send(await user.createMultipleUsers(req.body));
    }else {
        // console.log(hasOwnProperties(users, "username", "firstname", "lastname", "email", "password", "role", "authToken") ? "true" : "false")
        if(hasOwnProperties(users,["username", "firstname", "lastname", "email", "password", "role", "authToken"])){
            if(isNaN(users.username) & isNaN(users.firstname) & isNaN(users.lastname) & isNaN(users.email) & isNaN(users.password) & isNaN(users.role) & isNaN(users.authToken))
            res.status(200).send(await user.createUser(users));
        }else res.status(400).send("Not all Properties given")
    }
})

app.delete("/:id", async (req, res) => {
    res.status(200).send(await user.deleteById(req.params.id));
})


module.exports = app;
const express = require("express");
const app = express.Router();
const user = require("../Objects/User");
const Helper = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");

const properties = [
  "username",
  "firstname",
  "lastname",
  "email",
  "password",
  "role",
  "authToken",
];

// #region GET Users
app.get("/", async (req, res) => {
    res.status(200).send(await user.getAll());
}) 

app.get("/download", async (req, res) => {
    handler.createAndSendFile("users", "csv", await user.getAll(), res);
})

app.get("/:id", async (req, res, next) => {
    let id = req.params.id;
    
    // if id is not a number go to the next route because it could be a name
    if(isNaN(id)){ next(); return; }

    // validate id
    if(id < 0) {res.status(400).send(Helper.ID_ERROR); return;}

    // check if id exists
    let userById = await user.getById(id);
    if(userById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return;}

    res.status(200).send(await user.getById(id));
})

app.get("/:name", async (req, res) => {
    let name = req.params.name;

    if(name.length < 3) {res.status(400).send(Helper.LENGTH_ERROR); return;}

    // check if users with name exists
    let foundUsers = await user.getByName(name);
    if(foundUsers.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return;}

    res.status(200).send(foundUsers);
})

app.get("/:id/download", async (req, res, next) => {
    let id = req.params.id;

    if(isNaN(id)){ next(); return; }

    // validate id
    if(id < 0) {res.status(400).send(ID_ERROR); return;}
  
    // check if id exists   
    let userById = await user.getById(id);
    if(userById.length == 0) {res.status(404).send(NOTHING_FOUND_ERROR); return;}

    handler.createAndSendFile("user_" + id, "csv", userById, res);
})

app.get("/:name/download", async (req, res) => {
    let name = req.params.name;

    if(name.length < 3) {res.status(400).send(Helper.LENGTH_ERROR); return;}

    let foundUsers = await user.getByName(name);
    if(foundUsers.length == 0) {res.status(404).send(Helper.NOTHING_FOUND_ERROR); return;}

    handler.createAndSendFile("users_" + name, "csv", foundUsers, res);
})

// #endregion

// #region POST User
app.post("/", async (req, res) => {
    let userBody = req.body;
    if(!Helper.checkProperties(properties, userBody)) {res.status(400).send(Helper.INVALID_PROPERTIES_ERROR); return;}

    // check if user with username exists
    let userByUsername = await user.getByUsername(userBody.username);
    if(userByUsername.length > 0) {res.status(400).send(Helper.USERNAME_ERROR); return;}

    if(!(userBody.email.includes("@") && userBody.email.includes("."))) { res.status(400).send("Invalid email!"); return;}

    let userByEmail = await user.getByEmail(userBody.email);
    if(userByEmail.length > 0) {res.status(400).send(Helper.EMAIL_ERROR); return;}


    res.status(200).send(await user.createUser(userBody));
})
// #endregion

// #region PUT User
app.put("/:id", async (req, res) => {
    let id = req.params.id;

    // validate id
    if(id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return;}

    // check if id exists
    let userById = await user.getById(id);
    if(userById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return;}

    // validate Body
    let userBody = req.body;
    if(!Helper.checkProperties(properties, userBody)) { res.status(400).send(Helper.INVALID_PROPERTIES_ERROR); return;}

    userBody.id = id;
    res.status(200).send(await user.update(userBody));
})
// #endregion

// #region DELETE User
app.delete("/:id", async (req, res) => {
    let id = req.params.id;

    // validate id
    if(id < 0 || isNaN(id)) {res.status(400).send(Helper.ID_ERROR); return;}

    // check if id exists
    let userById = await user.getById(id);
    if(userById.length == 0) {res.status(404).send(Helper.NOTHING_FOUND_ERROR); return;}

    res.status(200).send(await user.deleteById(id));
})
// #endregion

module.exports = app;

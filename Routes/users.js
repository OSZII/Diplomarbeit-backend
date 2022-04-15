const express = require("express");
const app = express.Router();

const jwt = require("jsonwebtoken");

const user = require("../Objects/User");
const Help = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");
const validator = require("../Objects/Validator");
const Userhandler = require("../Handler/Userhandler");

const { JsonWebTokenError } = require("jsonwebtoken");
const { TypeNumbers } = require("mariadb");
const { type } = require("express/lib/response");


let objectProperties = [
  "username",
  "firstname",
  "lastname",
  "email",
  "password",
  "role",
  "authToken",
];

const userhandler = new Userhandler(user, objectProperties);

app.get("/:parameters?/:downloadSpecific?", validator.verifyToken, async (req, res) => {
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
          res.send(await user.getAll()).status(200);
          break;
        case parameters == "download":
          handler.createAndSendFile("users", "csv", await user.getAll(), res);
          break;
        case typeof parameters === "number":
          userhandler.handleId(parameters, downloadSpecific, res)
          break;
        default:
          userhandler.handleName(parameters, downloadSpecific, res)
          break;
      }
});

// TODO: als rückgabe auch die erstellten User zurückgeben
app.post("/", validator.verifyToken, async (req, res) => {
      let users = req.body;
      switch(true){
        case Object.keys(users).length == 0:
          res.send("Body can't be empty").status(400);
          break;
        default:
          console.log("single User")
          userhandler.createUser(users, objectProperties, res);
          break;
      }
});

app.put("/:id", validator.verifyToken, async (req, res) => {
  
  let id = req.params.id;
  let user = req.body;
  if(typeof id == "undefined" || typeof user == "undefined"){
    res.send("Undefined Id or body").status(400)
  } else {
    userhandler.updateUser(user, id, res)
  }
})

app.delete("/:id", validator.verifyToken, async (req, res) => {
      let id = req.params.id;
      userhandler.deleteUserById(id, res);
});

module.exports = app;

const express = require("express");
const app = express.Router();

const jwt = require("jsonwebtoken");

const user = require("../Objects/User");
const Help = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");
const { JsonWebTokenError } = require("jsonwebtoken");
const validator = require("../Objects/Validator");
const { TypeNumbers } = require("mariadb");
const { type } = require("express/lib/response");
const Userhandler = require("../Handler/Userhandler");
const User = require("../Objects/User");

let objectProperties = [
  "username",
  "firstname",
  "lastname",
  "email",
  "password",
  "role",
  "authToken",
];

app.get("/:parameters?/:downloadSpecific?", verifyToken, async (req, res) => {
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
          Userhandler.handleId(parameters, downloadSpecific, user, res)
          break;
        default:
          Userhandler.handleName(parameters, downloadSpecific, user, res)
          break;
      }
});

// TODO: als rückgabe auch die erstellten User zurückgeben
app.post("/", verifyToken, async (req, res) => {
      let users = req.body;
      // console.log(typeof users)
      switch(true){
        case Object.keys(users).length == 0:
          res.send("Body can't be empty").status(400);
          break;
        case Array.isArray(users):
          console.log("mulitple Users")
          // Userhandler.createMultipleUsers(users, res); 
          break;
        default:
          console.log("single User")
          Userhandler.createUser(user, users, objectProperties, res);
          break;
      }
      // if (Array.isArray(users)) {
      //   // validate if each object in array has all properties
      //   let result = true;
      //   for (let i = 0; i < users.length; i++) {
      //     result &=
      //       Userhandler.checkIfHasAllProperties(users[i], objectProperties) &
      //       Help.isNanArray([
      //         users[i].username,
      //         users[i].firstname,
      //         users[i].lastname,
      //         users[i].email,
      //         users[i].role,
      //         users[i].authToken,
      //       ]) &
      //       (typeof (await user.getByEmail(users[i].email))[i] == "undefined");
      //   }
      //   if (result) res.status(200).send(await user.createMultipleUsers(users));
      //   else
      //     res
      //       .status(400)
      //       .send(Help.notAllProperties + " or Email already taken");
      // } else {
        // if (Help.hasOwnProperties(users, objectProperties)) {
        //   if (
        //     Help.isNanArray([
        //       users.username,
        //       users.firstname,
        //       users.lastname,
        //       users.email,
        //       users.role,
        //       users.authToken,
        //     ])
        //   ) {
        //     if (typeof (await user.getByEmail(users.email))[0] == "undefined") {
        //       res.status(200).send(await user.createUser(users));
        //     } else res.status(400).send("Email already exists!");
        //   } else res.status(400).send("Properties must be string or null");
        // } else res.status(400).send(Help.notAllProperties);
      // }
});

// Beim return auch den gelöschten user in einem Array zurückgeben
app.delete("/:id", verifyToken, async (req, res) => {
      let responseArray = [];
      let id = req.params.id;
      let message = validator.validateNumber(id);
      if (message == true) {
        let returnedUser = await user.getById(id);
        let receivedUser = await user.deleteById(id);
        if (receivedUser.affectedRows != 0) {
          responseArray.push(receivedUser, returnedUser[0]);
          res.status(200).send(responseArray);
        } else {
          res.status(404).send(Help.notFound);
        }
      } else res.status(400).send(message);
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const brearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof brearerHeader !== "undefined") {
    // Token von bearer trennen
    const bearer = brearerHeader.split(" ");

    // Get token
    const bearerToken = bearer[1];

    req.token = bearerToken;

    jwt.verify(req.token, "secretkey", async (err, authData) => {
      if (err) res.sendStatus(403);
      else {
        next();
      }
    })
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

module.exports = app;

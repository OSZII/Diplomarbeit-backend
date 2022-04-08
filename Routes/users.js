const express = require("express");
const app = express.Router();

const jwt = require("jsonwebtoken");

const user = require("../Objects/User");
const Help = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");
const { JsonWebTokenError } = require("jsonwebtoken");
const validator = require("../Objects/Validator");
const { TypeNumbers } = require("mariadb");

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
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      let parameters = req.params.parameters; // erste Parameter
      let downloadSpecific = req.params.downloadSpecific; // zweiter Parameter

      // Falls erster Parameter eine Zahl, dann wird sie hier umgewandelt
      try {
        let temp = parseInt(parameters);
        if(typeof temp === "number") parameters = temp;
      } catch (error) {
        console.log("Parameter keine Number");
      }

      console.log("zweiter Parameter: ", downloadSpecific)
      console.log(parameters)

      switch (true) {
        case typeof parameters == "undefined":
          res.send(await user.getAll()).status(200);
          break;
        case parameters == "download":
          // creates file for all users
          handler.createAndSendFile("users", "csv", await user.getAll(), res);
          break;
        case typeof parameters === "number":
          // Wenn eine id eingegeben wurde
          console.log("NUMBER")
          switch (true) {
            case typeof downloadSpecific == "undefined":
              // GetById
              res.send(await user.getById(parameters)).status(200);
            case downloadSpecific === "download":
              // Download By Id
              handler.createAndSendFile("user_" + parameters, "csv", await user.getById(parameters), res);
              break;
            default:
              // Ungültiger Wert
              res.send("Ungültiger zweiter Parameter nur download möglich").status(400);
          }
          break;
        default:
          // parameter ist string
          res.send(await user.getByName(parameters)).status(200);
          break;
      }
      // create users.csv
      // if (parameters == "download") {
      //   handler.createAndSendFile("users", "csv", users, res);
      // } else if (parameters == undefined) {
      //   // userausgabe
      //   res.status(200).send(users);
      // } else {
      //   if (!isNaN(parameters)) {
      //     // #region Suche nach user mit id
      //     let result = await Help.searchById(parameters, user);
      //       if(result[0].hasOwnProperty("id")){
      //         if (downloadSpecific == "download") {

      //           handler.createAndSendFile("user_with_id_" + parameters, "csv", result, res);

      //         } else res.status(200).send(result);
      //       } else res.status(result[0]).send(result[1]);
      //     // #endregion
      //   } else {
      //     // #region suche mit String
      //     let result = await Help.searchByString(parameters, user);
      //     if (result[0].hasOwnProperty("id")) {
      //       if (downloadSpecific == "download") {
      //         handler.createAndSendFile("users_with_" + parameters, "csv", result, res);
      //       } else res.status(200).send(result);
      //     } else {
      //       res.status(result[0]).send(result[1]);
      //     }
      //     // #endregion
      //   }
      // }
    }
  });
});

// TODO: als rückgabe auch die erstellten User zurückgeben
// Passwörter werden vor dem versenden vom Frontend gehashed
app.post("/", verifyToken, async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      let users = req.body;
      if (Array.isArray(users)) {
        // validate if each object in array has all properties
        let result = true;
        for (let i = 0; i < users.length; i++) {
          result &=
            Help.hasOwnProperties(users[i], objectProperties) &
            Help.isNanArray([
              users[i].username,
              users[i].firstname,
              users[i].lastname,
              users[i].email,
              users[i].role,
              users[i].authToken,
            ]) &
            (typeof (await user.getByEmail(users[i].email))[i] == "undefined");
        }
        if (result) res.status(200).send(await user.createMultipleUsers(users));
        else
          res
            .status(400)
            .send(Help.notAllProperties + " or Email already taken");
      } else {
        if (Help.hasOwnProperties(users, objectProperties)) {
          if (
            Help.isNanArray([
              users.username,
              users.firstname,
              users.lastname,
              users.email,
              users.role,
              users.authToken,
            ])
          ) {
            if (typeof (await user.getByEmail(users.email))[0] == "undefined") {
              res.status(200).send(await user.createUser(users));
            } else res.status(400).send("Email already exists!");
          } else res.status(400).send("Properties must be string or null");
        } else res.status(400).send(Help.notAllProperties);
      }
    }
  });
});

// Beim return auch den gelöschten user in einem Array zurückgeben
app.delete("/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) res.sendStatus(403);
    else {
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
    }
  });
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

    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

module.exports = app;

const express = require("express");
const user = require("../Objects/User");
const Help = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");
const { validateNumber } = require("../Objects/Validator");
const path = require("path");
const fs = require("fs");
const { createInflate } = require("zlib");
const app = express.Router();

let objectProperties = [
  "username",
  "firstname",
  "lastname",
  "email",
  "password",
  "role",
  "authToken",
];

// function createAndSendFile(fileName, format, data, res) {
//     fileName = fileName + "." + format;
//     let filePath = path.join(__dirname, "..", fileName);
//     if (format == "csv") {
//       Help.writeToCSV(data, fileName);
//     }
//     // return filePath;
//     setTimeout(() => {
//       res.status(200).download(filePath);
//     }, Help.sendFileTimeout);
    
//     deleteFile(filePath);  
// }

async function searchByString(parameters) {
  if (parameters.length >= 3) {
    let receivedUser = await user.getByName(parameters);
    if (receivedUser.length != 0) {
      return receivedUser;
    } else return [404, Help.notFound];
  } else return [400, Help.longerThan3];
}

app.get("/:parameters?/:downloadSpecific?", async (req, res) => {
  let parameters = req.params.parameters;
  let downloadSpecific = req.params.downloadSpecific;
  let users = await user.getAll();
  
  // create users.csv
  if (parameters == "download") {
    
    handler.createAndSendFile("users", "csv", users, res);

  } else if (parameters == undefined) {
    // userausgabe
    res.status(200).send(users);
  } else {
    if (!isNaN(parameters)) {
      // #region Suche nach user mit id
      let result = await Help.searchById(parameters, user);
      if (parameters > 0) {
        let receivedUser = await user.getById(parameters);
        if (receivedUser.length != 0) {
          // Gibt user mit ID als csv zurück
          if (downloadSpecific == "download") {

            handler.createAndSendFile("user_with_id_" + parameters, "csv", receivedUser, res);

            // Gibt user mit ID zurück
          } else res.status(200).send(receivedUser);
        } else res.status(404).send(Help.notFound);
      } else res.status(400).send(Help.largerThanZero);
      // #endregion
    } else {
      // #region suche mit String
      // Parameter ist string suche nach user der String enthält
      let result = await searchByString(parameters);
      console.log(result[0])
      if (result[0].hasOwnProperty("id")) {
        console.log("true")
        if (downloadSpecific == "download") {
          handler.createAndSendFile("users_with_" + parameters, "csv", result, res);
        } else res.status(200).send(result);
      } else {
        res.status(result[0]).send(result[1]);
      }
      // #endregion
    }
  }
});

// statt 2 endpoints mit name kann man hier entweder eine Zahl oder einen String übergeben
// app.get("/:idOrName", async (req, res) => {
//   console.log("id or name");
//   let idOrName = req.params.idOrName;
//   if (!isNaN(idOrName)) {
//     if (idOrName > 0) {
//       let receivedUser = await user.getById(idOrName);
//       if (receivedUser.length != 0) {
//         res.status(200).send(receivedUser);
//       } else res.status(404).send(Help.notFound);
//     } else res.status(400).send(Help.largerThanZero);
//   } else {
//     if (idOrName.length >= 3) {
//       let receivedUser = await user.getByName(idOrName);
//       if (receivedUser.length != 0) {
//         res.status(200).send(receivedUser);
//       } else res.status(404).send(Help.notFound);
//     } else res.status(400).send(Help.longerThan + " 3");
//   }
// });

// app.get("/:idOrName/download", async (req, res) => {
//   let idOrName = req.params.idOrName;
//   if (!isNaN(idOrName)) {
//     if (idOrName > 0) {
//       let receivedUser = await user.getById(idOrName);
//       if (receivedUser.length != 0) {
//         let fileName = "user_" + idOrName + ".csv";
//         Help.writeToCSV(receivedUser, fileName);
//         res.status(200).sendFile(path.join(__dirname, "..", fileName));
//       } else res.status(404).send(Help.notFound);
//     } else res.status(400).send(Help.largerThanZero);
//   } else {
//     if (idOrName.length >= 3) {
//       let receivedUser = await user.getByName(idOrName);
//       if (receivedUser.length != 0) {
//         let fileName2 = "user_s_with_" + idOrName + ".csv";
//         Help.writeToCSV(receivedUser, fileName2);
//         res.status(200).sendFile(path.join(__dirname, "..", fileName2));
//       } else res.status(404).send(Help.notFound);
//     } else res.status(400).send(Help.longerThan + " 3");
//   }
// });

// TODO: als rückgabe auch die erstellten User zurückgeben
// Passwörter werden vor dem versenden vom Frontend gehashed
app.post("/", async (req, res) => {
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
      res.status(400).send(Help.notAllProperties + " or Email already taken");
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
});

// Beim return auch den gelöschten user in einem Array zurückgeben
app.delete("/:id", async (req, res) => {
  let responseArray = [];
  let id = req.params.id;
  let message = validateNumber(id);
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

  // if (!isNaN(id)) {
  //   if (id > 0) {
  //     let receivedUser = await user.deleteById(id);
  //     if(receivedUser.length != 0){
  //       res.status(200).send(receivedUser);
  //     }else res.status(404).send(Help.notFound);
  //   }else res.status(400).send(Help.largerThanZero);
  // }else res.status(400).send(Help.notANumber);
});

module.exports = app;

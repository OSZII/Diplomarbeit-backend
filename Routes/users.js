const express = require("express");
const user = require("../Objects/User");
const Help = require("../Helper/Helper");
const { validateNumber } = require("../Objects/Validator");
const path = require("path");
const fs = require("fs");
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

app.get("/:parameters?/:downloadSpecific?", async (req, res) => {
  let parameters = req.params.parameters;
  let downloadSpecific = req.params.downloadSpecific;
  let fileName = "";
  let filePath = "";
  let users = await user.getAll();
  if (parameters == "download") {
    // download
    fileName = "users.csv";
    filePath = path.join(__dirname, "..", fileName);
    Help.writeToCSV(users, fileName);
    setTimeout(function () {
      res.status(200).sendFile(filePath);
    }, 100);
    setTimeout(() => {
      fs.unlink(filePath, () => {
        console.log("File:", filePath, "has been deleted")
      });
    }, 200);
    // download ende
  } else if (parameters == undefined) {
    res.status(200).send(users);
  } else {
    // Spezifische parameter Pfad
    // hier kommt man hin wenn parameters != download oder parameters != leer ist 
    if (!isNaN(parameters)) {
      // Parameter ist Zahl
      if (parameters > 0) {
        let receivedUser = await user.getById(parameters);
        if (receivedUser.length != 0) {
          // Gibt user mit ID als csv zurück
          if (downloadSpecific == "download") {
            // download
            fileName = "users_with_id_" + parameters + ".csv";
            filePath = path.join(__dirname, "..", fileName);
            Help.writeToCSV(receivedUser, fileName);
            setTimeout(function () {
              res.status(200).sendFile(filePath);
            }, 100);
            setTimeout(() => {
              fs.unlink(filePath, () => {
                console.log("File:", filePath, "has been deleted")
              });
            }, 200);
            // Download ende
            // Gibt user mit ID zurück
          } else res.status(200).send(receivedUser);
        } else res.status(404).send(Help.notFound);
      } else res.status(400).send(Help.largerThanZero);
    } else {
      // Parameter ist string suche nach user der String enthält
      if (parameters.length >= 3) {
        let receivedUser = await user.getByName(parameters);
        if (receivedUser.length != 0) {
          if (downloadSpecific == "download") {
            // Download
            fileName = "users_with_" + parameters + ".csv";
            let filePath = path.join(__dirname, "..", fileName);
            Help.writeToCSV(receivedUser, fileName);
            setTimeout(function () {
              res.status(200).sendFile(filePath);
            }, 100);
            setTimeout(() => {
              fs.unlink(filePath, () => {
                console.log("File:", filePath, "has been deleted")
              });
            }, 200);
            // Download ende
          } else res.status(200).send(receivedUser);
        } else res.status(404).send(Help.notFound);
      } else res.status(400).send(Help.longerThan + " 3");
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
  console.log(id)
  let message = validateNumber(id);
  if (message == true) {
    let returnedUser = await user.getById(id)
    let receivedUser = await user.deleteById(id);
    if(receivedUser.affectedRows != 0) {
      responseArray.push(receivedUser, returnedUser[0]);
      res.status(200).send(responseArray) 
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

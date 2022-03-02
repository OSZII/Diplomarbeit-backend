const express = require("express");
const app = express.Router();

const user = require("../Objects/User");
const Help = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");

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

// async function searchByString(parameters, object) {
//   if (parameters.length >= 3) {
//     let receivedUser = await object.getByName(parameters);
//     if (receivedUser.length != 0) {
//       return receivedUser;
//     } else return [404, Help.notFound];
//   } else return [400, Help.longerThan3];
// }

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
        if(result[0].hasOwnProperty("id")){
          if (downloadSpecific == "download") {

            handler.createAndSendFile("user_with_id_" + parameters, "csv", result, res);

          } else res.status(200).send(result);
        } else res.status(result[0]).send(result[1]);
      // #endregion
    } else {
      // #region suche mit String
      let result = await Help.searchByString(parameters, user);
      if (result[0].hasOwnProperty("id")) {
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

const express = require("express");
const user = require("../Objects/User");
const Help = require("../Helper/Helper");
const { validateNumber } = require("../Objects/Validator");
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

app.get("/", async (req, res) => {
  let users = await user.getAll();
  let userArray = [];
  for(let i = 0; i < users.length; i++){
    userArray.push(users[i]);
  }
  // console.log((await user.getAll())[10]);
  res.status(200).send(userArray);
});

app.get("/download", async (req, res) => {
  let users = await user.getAll();
  let userArray = [];
  for(let i = 0; i < users.length; i++){
    userArray.push(users[i]);
  }
  const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("users.csv");

fastcsv
  .write(userArray, { headers: true })
  .on("finish", function() {
    console.log("Write to CSV successfully!");
  })
  .pipe(ws);

  res.status(200).sendFile("C:/Users/Stefan/Desktop/Git Repos/Diplomarbeit-backend/users.csv");
});

// statt 2 endpoints mit name kann man hier entweder eine Zahl oder einen String übergeben
app.get("/:idOrName", async (req, res) => {
  let idOrName = req.params.idOrName;
  if (!isNaN(idOrName)) {
    if (idOrName > 0) {
      let receivedUser = await user.getById(idOrName);
      if(receivedUser.length != 0){
        res.status(200).send(receivedUser);
      } else res.status(404).send(Help.notFound);
    } else res.status(400).send(Help.largerThanZero);
  } else {
    if (idOrName.length >= 3) {
      let receivedUser = await user.getByName(idOrName);
      if(receivedUser.length != 0){
        res.status(200).send(receivedUser);
      } else res.status(404).send(Help.notFound);
    } else res.status(400).send(Help.longerThan + " 3");
  }
});

// Passwörter werden vor dem versenden gehashed
app.post("/", async (req, res) => {
  let users = req.body;
  if (Array.isArray(users)) {
    // validate if each object in array has all properties
    let result = true;
    for (let i = 0; i < users.length; i++) {
      result &=
        (
        Help.hasOwnProperties(users[i], objectProperties) &
        Help.isNanArray([
          users[i].username,
          users[i].firstname,
          users[i].lastname,
          users[i].email,
          users[i].role,
          users[i].authToken,
        ]) & (typeof((await user.getByEmail(users[i].email))[i]) == "undefined"));
    }

    if (result) res.status(200).send(await user.createMultipleUsers(users));
    else res.status(400).send(Help.notAllProperties + " or Email already taken");
  } else {
    if (Help.hasOwnProperties(users, objectProperties)) {
      if (
        Help.isNanArray([
          users.username,
          users.firstname,
          users.lastname,
          users.email,
          users.role,
          users.authToken
        ])
      ) {
        if(typeof((await user.getByEmail(users.email))[0]) == "undefined"){
          res.status(200).send(await user.createUser(users));
        } else res.status(400).send("Email already exists!")
      } else res.status(400).send("Properties must be string or null");
    } else res.status(400).send(Help.notAllProperties);
  }
});

app.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let message = validateNumber(id);
  if(message == true){
    let receivedUser = await user.deleteById(id);
    receivedUser.length != 0 ? res.status(200).send(receivedUser) : res.status(404).send(Help.notFound);
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

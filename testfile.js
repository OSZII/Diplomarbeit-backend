// // Database
// // Mit dieser Methode muss man keinen Namespace verwenden
// // also anstatt database.connection kann man hier ganz einfach connection verwenden

// // testen ob das geht
// // db.query("INSERT INTO users (username, role) values ('testuser', 'user');", "Füge User Hinzu!");
// const path = require("path")
// const express = require('express');
// const app = express();

// // const users = require("./Routes/users");
// // const fields = require("./Routes/fields");
// // const sensors = require("./Routes/sensors");
// // const sensorValues = require("./Routes/sensorValues");

// // console.log(connection.state)

// // Erlaubt es URL encoded Data zu verwenden, weil ansonsten ist req bei post immer undefined
// // Mit dem allein Funktioniert json aber nicht
// app.use(express.urlencoded({ extended: false }));
// // Mit dieser Zeile geht dann auch json
// app.use(express.json());

// app.use(express.static("public"))

// let resArray = [300, "testmessage"]

// app.get("/", (req, res) => {
//     res.status(resArray[0]).send(resArray[1]);
// })


// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const app = express.Router();

const field = require("../Objects/Field");
const { Helper, checkProperties, INVALID_PROPERTIES_ERROR, ID_ERROR, NOTHING_FOUND_ERROR } = require("../Helper/Helper");
const handler = require("../Objects/FileHandler");


const properties = [
    "name",
    "area",
    "unit",
    "country",
    "federalState",
    "postalCode",
    "street",
    "latitude",
    "longitude",
    "description"
];

// #region GET Fields
app.get("/", async(req, res) => {
    res.status(200).send(await field.getAll());
})

app.get("/download", async(req, res) => {
    handler.createAndSendFile("fields", "csv", await field.getAll(), res);
})

app.get("/:id", async(req, res) => {
    let id = req.params.id;

    // validate id
    if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

    // check if id exists
    let userById = await field.getById(id);
    if (userById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

    res.status(200).send(await field.getById(id));
})

app.get("/:id/download", async(req, res) => {
    let id = req.params.id;

    // validate id 
    if (id < 0 || isNaN(id)) { res.status(400).send(ID_ERROR); return; }

    // check if id exists
    let fieldById = await field.getById(id);
    if (fieldById.length == 0) { res.status(404).send(NOTHING_FOUND_ERROR); return; }

    handler.createAndSendFile("field_" + id, "csv", fieldById, res);
})

// #region POST Field
app.post("/", async(req, res) => {
        let fieldBody = req.body;
        if (!checkProperties(properties, fieldBody)) { res.status(400).send(INVALID_PROPERTIES_ERROR); return; }

        res.status(200).send(await field.createUser(fieldBody));
    })
    // #endregion

// #region PUT Field
app.put("/:id", async(req, res) => {
        let id = req.params.id;

        // validate id
        if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

        // check if id exists
        let fieldById = await field.getById(id);
        if (fieldById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

        // validate Body
        let fieldBody = req.body;
        if (!checkProperties(properties, fieldBody)) { res.status(400).send(Helper.INVALID_PROPERTIES_ERROR); return; }

        fieldBody.id = id;
        res.status(200).send(await field.update(fieldBody, id));

    })
    // #endregion

// #region DELETE Field
app.delete("/:id", async(req, res) => {
        let id = req.params.id;

        // validate id
        if (id < 0 || isNaN(id)) { res.status(400).send(Helper.ID_ERROR); return; }

        // check if id exists
        let fieldById = await field.getById(id);
        if (fieldById.length == 0) { res.status(404).send(Helper.NOTHING_FOUND_ERROR); return; }

        res.status(200).send(await field.deleteById(id));

    })
    // #endregion


// let GEO_API_KEY = process.env.GEO_API_KEY;
//     // console.log((await getGeoData("AT","Tirol"))[0])

// async function getGeoData(countryCode, federalState, postalCode, street){
//     let url = `https://open.mapquestapi.com/geocoding/v1/address?key=${GEO_API_KEY}&location=${countryCode}+${federalState}+${postalCode}+${street}`;
//     const response = await axios.get(url);
//     let latitude = response.data.results[0].locations[0].latLng.lat;
//     let longitude = response.data.results[0].locations[0].latLng.lng;
//     return [latitude, longitude];
// }

// Get all fields
// app.get("/:parameters?/:downloadSpecific?", async (req, res) => {
//       let parameters = req.params.parameters; // erste Parameter
//       let downloadSpecific = req.params.downloadSpecific; // zweiter Parameter

//       try {
//           let temp = parseInt(parameters);
//           if(!isNaN(temp)) parameters = temp;
//       } catch (error) {
//         console.log("Parameter keine Number");
//       }

//       switch (true) {
//         case typeof parameters == "undefined":
//           res.send(await field.getAll()).status(200);
//           break;
//         case parameters == "download":
//           handler.createAndSendFile("fields", "csv", await field.getAll(), res);
//           break;
//         case typeof parameters === "number":
//           fieldhandler.handleId(parameters, downloadSpecific, res)
//           break;
//         default:
//           fieldhandler.handleName(parameters, downloadSpecific, res)
//           break;
//       }
// });

// // Creates field
// app.post("/" , async (req, res) => {
//   let fields = req.body;
//       switch(true){
//         case Object.keys(fields).length == 0:
//           res.send("Body can't be empty").status(400);
//           break;
//         default:
//           // console.log("single Field")
//           fieldhandler.createField(fields, res);
//           break;
//       }
// });

// app.put("/:id", async (req, res) => {
//   let id = req.params.id;
//   let fields = req.body;
//   if(typeof id == "undefined" || typeof fields == "undefined"){
//     res.send("Undefined id or body").status(400)
//   } else {
//     fieldhandler.updateField(fields, id, res)
//   }
// })

// app.delete("/:id", async (req, res) => {
//   let id = req.params.id;
//       fieldhandler.deleteFieldById(id, res);
// });

module.exports = app;
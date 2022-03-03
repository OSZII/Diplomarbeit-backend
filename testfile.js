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
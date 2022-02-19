// Database
// Mit dieser Methode muss man keinen Namespace verwenden
// also anstatt database.connection kann man hier ganz einfach connection verwenden

// testen ob das geht
// db.query("INSERT INTO users (username, role) values ('testuser', 'user');", "Füge User Hinzu!");

const express = require('express');
const app = express();

const users = require("./Routes/users");
const fields = require("./Routes/fields");
const sensors = require("./Routes/sensors");
const sensorValues = require("./Routes/sensorValues");

// console.log(connection.state)

// Erlaubt es URL encoded Data zu verwenden, weil ansonsten ist req bei post immer undefined
// Mit dem allein Funktioniert json aber nicht
app.use(express.urlencoded({ extended: false }));
// Mit dieser Zeile geht dann auch json
app.use(express.json());

app.use("/users", users);
app.use("/fields", fields);
app.use("/sensors", sensors);
app.use("/sensorvalues", sensorValues);

app.get("/", (req, res) => {
    res.send("Hello world!");
})

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("GOT A POST REQUEST!");
})

async function testuser()
{
    const user = require("./Objects/User");
    let receivedUser = await user.getByEmail("admin@gmail.com");
    // console.log( receivedUser[0]);
}

testuser();
// console.log(process.env.GEO_API)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
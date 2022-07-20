// Database
// Mit dieser Methode muss man keinen Namespace verwenden
// also anstatt database.connection kann man hier ganz einfach connection verwenden

// testen ob das geht
// db.query("INSERT INTO users (username, role) values ('testuser', 'user');", "Füge User Hinzu!");
const path = require("path")
const bcrypt = require("bcrypt");
var cors = require('cors')
const express = require('express');
const app = express();
const usersObject = require("./Objects/User");
const jwt = require("jsonwebtoken");
// const { default: axios } = require("axios");

// console.log(connection.state)

// Erlaubt es URL encoded Data zu verwenden, weil ansonsten ist req bei post immer undefined
// Mit dem allein Funktioniert json aber nicht
// Mit dieser Zeile geht dann auch json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"))
// All Routes that should be accesible without a token

app.post("/login", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username == undefined | password == undefined) {res.sendStatus(400); return;}
    const loginUser = (await usersObject.getByName(username))[0];
    if (loginUser == undefined) {res.sendStatus(404); return; }
    if (!bcrypt.compareSync(password, loginUser.password)) {res.sendStatus(403); return; }
    jwt.sign({ user: loginUser }, "secretkey"/* , {expiresIn: '30s'} */, (err, token) => {
        res.json({ token: token })
    })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/index.html"));
})

app.all("*", verifyToken);

app.use("/users", require("./Routes/users"));
app.use("/fields", require("./Routes/fields"));
app.use("/sensors", require("./Routes/sensors"));
app.use("/sensorvalues", require("./Routes/sensorValues"));

app.get('*', function (req, res) {
    res.status(404).send('No such route found???');
});

app.put("*", (req, res) => {
    res.status(404).send("No such route found???");
})

app.post("*", (req, res) => {
    res.status(404).send("No such route found???");
})

app.delete("*", (req, res) => {
    res.status(404).send("No such route found???");
})

// #endregion

function verifyToken(req, res, next) {
    // Get auth header value
    const brearerHeader = req.headers["authorization"];
    
    // Check if bearer is undefined
    if (typeof brearerHeader == "undefined") {res.sendStatus(403); return;}
        // Token von bearer trennen
        const bearer = brearerHeader.split(" ");
        // Get token
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, "secretkey", async (err, authData) => {
            if (err) {
                res.sendStatus(403); return; }
            next();
        })
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
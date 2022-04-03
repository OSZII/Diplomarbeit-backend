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

const users = require("./Routes/users");
const fields = require("./Routes/fields");
const sensors = require("./Routes/sensors");
const sensorValues = require("./Routes/sensorValues");

const jwt = require("jsonwebtoken");

// console.log(connection.state)

// Erlaubt es URL encoded Data zu verwenden, weil ansonsten ist req bei post immer undefined
// Mit dem allein Funktioniert json aber nicht
app.use(express.urlencoded({ extended: true }));
// Mit dieser Zeile geht dann auch json
app.use(express.json());
app.use(cors());

app.use(express.static("public"))

app.use("/users", users);
app.use("/fields", fields);
app.use("/sensors", sensors);
app.use("/sensorvalues", sensorValues);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/index.html"));
})

app.post("/login", async (req, res) => {
    console.log("login");
    let username = req.body.username;
    let password = req.body.password;
    
    if(username == undefined | password == undefined){
        res.sendStatus(400);
    }else {
        const loginUser = (await usersObject.getByName(username))[0];
        
        if(bcrypt.compareSync(password, loginUser.password)){
            jwt.sign({user: loginUser}, "secretkey"/* , {expiresIn: '30s'} */, (err, token) => {
                res.json({token: token})
            })
        }else{
            res.sendStatus(403);
        }
    }

    

    // res.send(loginUser)
})

app.post("/hashpassword", (req, res) => {
    let password = req.body.password;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            res.json({hash: hash})
        })
    })

})

app.post("/", (req, res) => {
    // console.log(req.body);
    console.log(req.socket.remoteAddress)
    res.send("GOT A POST REQUEST!");
})

app.get('*', function(req, res){
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

// console.log(process.env.NODE_ENV)
// console.log(process.env.GEO_API)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
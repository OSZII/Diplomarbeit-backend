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
const { default: axios } = require("axios");

// console.log(connection.state)

// Erlaubt es URL encoded Data zu verwenden, weil ansonsten ist req bei post immer undefined
// Mit dem allein Funktioniert json aber nicht
app.use(express.urlencoded({ extended: true }));
// Mit dieser Zeile geht dann auch json
app.use(express.json());
app.use(cors());
app.use(express.static("public"))
// All Routes that should be accesible without a token
app.post("/login", async (req, res) => {
    console.log("login");
    let username = req.body.username;
    let password = req.body.password;
    
    if(username == undefined | password == undefined) res.sendStatus(400);
    else {
        const loginUser = (await usersObject.getByName(username))[0];
        if(loginUser == undefined) res.sendStatus(400);
        else{
            if(bcrypt.compareSync(password, loginUser.password)){
                jwt.sign({user: loginUser}, "secretkey"/* , {expiresIn: '30s'} */, (err, token) => {
                    res.json({token: token})
                })
            }else{
                res.sendStatus(403);
            }
        }
    }
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/index.html"));
})

// All routesm after this need to be verified
// app.get("*", verifyToken ,(req, res, next) => {
//     console.log("GET REQUEST");
//     next();
// })

app.all("*", verifyToken);

app.use("/users", users);
app.use("/fields", fields);
app.use("/sensors", sensors);
app.use("/sensorvalues", sensorValues);

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Ok").status(200);
})


// #region Some routes
app.get("/weatherforecast", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
        if(err) res.sendStatus(403);
        else{
            // hier kommt der code hinein
            // console.log(req.headers.latitude)
            // console.log(req.headers.longitude)
            let weatherApiKey = process.env.Openweather_API_KEY;
            axios({
                method: "GET",
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${req.headers.latitude}&lon=${req.headers.longitude}&exclude=current,minutely,alerts,hourly&appid=${process.env.Openweather_API_KEY}&units=metric`,
            }).then((response) => {
                // console.log("ok")
                // console.log(response)
                // res.json(response).status(200);
                res.send(response.data)
                // console.log("not ok")
            }).catch((error) => {
                console.log(error)
                console.log("Fehlermeldung")
            });
        }
    })
})

app.get("/countrynames", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
        if(err) res.sendStatus(403);
        else{
            
        }
    })
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

// #endregion

function verifyToken(req, res, next) {
  console.log("Verification");

    // Get auth header value
  const brearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof brearerHeader !== "undefined") {
    // Token von bearer trennen
    const bearer = brearerHeader.split(" ");

    // Get token
    const bearerToken = bearer[1];

    req.token = bearerToken;

    jwt.verify(req.token, "secretkey", async (err, authData) => {
      if (err) res.sendStatus(403);
      else {
        next();
      }
    })
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
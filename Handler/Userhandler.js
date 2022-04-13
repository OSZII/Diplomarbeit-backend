const { use } = require("bcrypt/promises");
const fileHandler = require("../Objects/FileHandler")

async function handleId(parameters, downloadSpecific, user, res){
    switch(true){
        case typeof downloadSpecific == "undefined":
            res.send(await user.getById(parameters)).status(200);
            break;
        case downloadSpecific == "download":
            fileHandler.createAndSendFile("user_" + parameters, "csv", await user.getById(parameters), res);
            break;
        default:
            res.send("Ungültiger zweiter Parameter nur download möglich").status(400);
            break;
    }
}

async function handleName(parameters, downloadSpecific, user, res){
    switch (true) {
        case typeof downloadSpecific == "undefined":
            res.send(await user.getByName(parameters)).status(200);
            break;
        case downloadSpecific == "download":
            fileHandler.createAndSendFile("users_" + parameters, "csv", await user.getByName(parameters), res);
            break;
        default:
            res.send("Ungültiger zweiter Parameter nur download möglich").status(400);
            break;
    }
}

function checkIfHasAllProperties(object, properties){
    let hasAllProperties = true;
      for (let i = 0; i < properties.length; i++) {
        if (!object.hasOwnProperty(properties[i])) hasAllProperties = false;
      }
      return hasAllProperties;
}

function checkValues(user){
    let valuesOk = true;
    Object.values(user).forEach((values) => {
        // console.log(valuesOk)
        // console.log(values)
        if(values == null){
            // isOk
        }else if(values.length >= 5){
            // auch ok
        }else{
            valuesOk = false;
        }
    })

    return valuesOk
}

async function createMultipleUsers(users, res){

}

async function userAlreadyExists(email, userClass){
    let userExists = false;
    let result = await userClass.getByEmail(email);
    if(!(typeof result[0] == "undefined")) userExists = true;
    console.log("userexists: " + userExists);
    return userExists
}

async function createUser(user, userBody, properties, res){
    // console.log(userBody)
    if(checkIfHasAllProperties(userBody, properties)){
        console.log("properties ok")
        if(checkValues(userBody)){
            if(!userAlreadyExists(userBody.email, user)){
                res.send(await user.createUser(userBody)).status(200);
            }else  res.send("Email already exists").status(400)
        } else res.status(400).send("Values can't be empty")
    } else res.status(400).send("Not All Properties given")
}


module.exports = {
    handleId: handleId,
    handleName: handleName,
    checkIfHasAllProperties: checkIfHasAllProperties,
    createMultipleUsers: createMultipleUsers,
    createUser: createUser,
}
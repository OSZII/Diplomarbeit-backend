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

module.exports = {
    handleId: handleId,
    handleName: handleName
}
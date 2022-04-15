const { use } = require("bcrypt/promises");
const fileHandler = require("../Objects/FileHandler")

class Userhandler {

    userClass;
    properties;

    constructor(userClass, properties){
        this.userClass = userClass;
        this.properties = properties;
        // console.log("userClass set")
        // console.log(this.userClass)
    }

    async handleId(parameters, downloadSpecific, res){
        switch(true){
            case typeof downloadSpecific == "undefined":
                res.send(await this.userClass.getById(parameters)).status(200);
                break;
            case downloadSpecific == "download":
                fileHandler.createAndSendFile("user_" + parameters, "csv", await this.userClass.getById(parameters), res);
                break;
            default:
                res.send("Ungültiger zweiter Parameter nur download möglich").status(400);
                break;
        }
    }
    
    async handleName(parameters, downloadSpecific, user, res){
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
    
    checkIfHasAllProperties(object){
        let hasAllProperties = true;
          for (let i = 0; i < this.properties.length; i++) {
            if (!object.hasOwnProperty(this.properties[i])) hasAllProperties = false;
          }
          return hasAllProperties;
    }
    
    checkValues(user){
        let valuesOk = true;
        Object.values(user).forEach((values) => {
            if(!(values == null || values.length >= 5)) valuesOk = false;
        })
        return valuesOk
    }
    
    // async createMultipleUsers(users, res){
    // 
    // }
    
    async userAlreadyExistsByEmail(email){
        let userExists = false;
        console.log("email")
        console.log(email)
        let result = await this.userClass.getByEmail(email);
        if(!(typeof result[0] === "undefined")) userExists = true;
        return userExists
    }
    
    async userAlreadyExistsById(id){
        let userExists = false;
        let result = await this.userClass.getById(id);
        if(!(typeof result[0] === "undefined")) userExists = true;
        return userExists
    }

    async userAlreadyExistsByUsername(username){
        let userExists = false;
        let result = await this.userClass.getByUsername(username);
        if(!(typeof result[0] === "undefined")) userExists = true;
        return userExists
    }
    
    async userAlreadyExists(userBody){
        console.log("userBody")
        console.log(userBody)
        console.log("userBody")
        return (await this.userAlreadyExistsByEmail(userBody.email)) || (await this.userAlreadyExistsByUsername(userBody.username));
    }

    async updateUser(userBody,id, res){
        // check ob der user mit derid existiert
        if(this.userAlreadyExistsById(id)){
            if(this.checkIfHasAllProperties(userBody)){
                if(this.checkValues(userBody)){
                    res.send(await this.userClass.update(userBody, id)).status(200)
                } else res.send("Invalid Values")
            } else res.send("Not all properties given").status(400);
        } else res.send("User existiert nicht").status(400);
    }
    
    async createUser(userBody, res){
        if(this.checkIfHasAllProperties(userBody)){
            console.log("properties ok")
            if(this.checkValues(userBody)){
                if(!(await this.userAlreadyExists(userBody))){
                    res.send(await this.userClass.createUser(userBody)).status(200);
                }else  res.send("Email or Username already exists").status(400)
            } else res.status(400).send("Values can't be empty")
        } else res.status(400).send("Not All Properties given")
    }

    async deleteUserById(id, res){
        try {
            id = parseInt(id);
        } catch (error) {
            console.log("Konnte nicht geparsed werden!");
        }

        if(isNaN(id)){
            res.send("Id is not a Number").status(400)
        } else {
            if(this.userAlreadyExistsById(id)){
                res.send(await this.userClass.deleteById(id)).status(200)
            } else res.send("Existiert nicht").status(400)
        }
        

    }

}




module.exports = Userhandler;
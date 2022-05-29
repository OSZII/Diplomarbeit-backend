const { use } = require("bcrypt/promises");
const fileHandler = require("../Objects/FileHandler");

class Fieldhandler {
  fieldClass;
  properties;

  constructor(fieldClass, properties) {
    this.fieldClass = fieldClass;
    this.properties = properties;
    // console.log("fieldClass set")
    // console.log(this.fieldClass)
  }

  async handleId(parameters, downloadSpecific, res) {
    switch (true) {
      case typeof downloadSpecific == "undefined":
        res.send(await this.fieldClass.getById(parameters)).status(200);
        break;
      case downloadSpecific == "download":
        fileHandler.createAndSendFile(
          "field_" + parameters,
          "csv",
          await this.fieldClass.getById(parameters),
          res
        );
        break;
      default:
        res
          .send("Ungültiger zweiter Parameter nur download möglich")
          .status(400);
        break;
    }
  }

  async handleName(parameters, downloadSpecific, res) {
    switch (true) {
      case typeof downloadSpecific == "undefined":
        res.send(await this.fieldClass.getByName(parameters)).status(200);
        break;
      case downloadSpecific == "download":
        fileHandler.createAndSendFile(
          "fields_" + parameters,
          "csv",
          await this.fieldClass.getByName(parameters),
          res
        );
        break;
      default:
        res
          .send("Ungültiger zweiter Parameter nur download möglich")
          .status(400);
        break;
    }
  }

  checkIfHasAllProperties(object) {
    let hasAllProperties = true;
    for (let i = 0; i < this.properties.length; i++) {
      if (!object.hasOwnProperty(this.properties[i])) hasAllProperties = false;
    }
    return hasAllProperties;
  }

  checkValues(field) {
    let valuesOk = true;
    Object.values(field).forEach((values) => {
      if (!(values == null || values.length >= 5)) return false;
    });
    // console.log("values OK")
    return valuesOk;
  }

  async fieldAlreadyExistsById(id) {
    let fieldExists = false;
    let result = await this.fieldClass.getById(id);
    if (!(typeof result[0] === "undefined")) fieldExists = true;
    return fieldExists;
  }

  async updateField(fieldBody, id, res) {
    // check ob der user mit derid existiert
    if (this.fieldAlreadyExistsById(id)) {
      if (this.checkIfHasAllProperties(fieldBody)) {
        if (this.checkValues(fieldBody)) {
          res.send(await this.fieldClass.update(fieldBody, id)).status(200);
        } else res.send("Invalid Values");
      } else res.send("Not all properties given").status(400);
    } else res.send("Field existiert nicht").status(400);
  }

  async createField(fieldBody, res) {
    if (this.checkIfHasAllProperties(fieldBody)) {
      // console.log("properties ok");
      if (this.checkValues(fieldBody)) {
        res.send(await this.fieldClass.createField(fieldBody)).status(200);
      } else res.status(400).send("Values can't be empty");
    } else res.status(400).send("Not All Properties given");
  }

  async deleteFieldById(id, res) {
    try {
      id = parseInt(id);
    } catch (error) {
      console.log("Konnte nicht geparsed werden!");
    }

    if (isNaN(id)) {
      res.send("Id is not a Number").status(400);
    } else {
      if (this.fieldAlreadyExistsById(id)) {
        res.send(await this.fieldClass.deleteById(id)).status(200);
      } else res.send("Existiert nicht").status(400);
    }
  }
}

module.exports = Fieldhandler;

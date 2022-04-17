const { use } = require("bcrypt/promises");
const fileHandler = require("../Objects/FileHandler");

class Sensorhandler {
  sensorClass;
  properties;
  parameters;
  downloadSpecific;
  res;

  constructor(sensorClass, properties) {
    this.sensorClass = sensorClass;
    this.properties = properties;
  }

  async handleId(parameters, downloadSpecific) {
    switch (true) {
      case typeof downloadSpecific == "undefined":
        this.res.send(await this.sensorClass.getById(parameters)).status(200);
        break;
      case downloadSpecific == "download":
        fileHandler.createAndSendFile(
          "sensor_" + parameters,
          "csv",
          await this.sensorClass.getById(parameters),
          this.res
        );
        break;
      default:
        this.res
          .send("Ungültiger zweiter Parameter nur download möglich")
          .status(400);
        break;
    }
  }

  async handleByFieldId(parameters, downloadSpecific){
    // parameters ist sowas wie fields1, fields2, fields3, ...
    // und wird in 2 teile aufgeteilt um die id herauszubekommen
    let id = parameters.split("fields")[1]
    // console.log(id)
    // this.res.send("OK").status(200)

    try {
      let temp = parseInt(id);
      if(!isNaN(temp)) id = temp;
    } catch (error) {
      console.log("Parameter keine Number");
  }
    
    if(typeof downloadSpecific == "undefined"){
      this.res.send(await this.sensorClass.getByFieldId(id)).status(200)
    }else if(downloadSpecific == "download"){
      fileHandler.createAndSendFile(
        "sensors_from_" + parameters,
        "csv",
        await this.sensorClass.getByFieldId(id),
        this.res
      );
    }
  }

  async handleType(parameters, downloadSpecific) {
    switch (true) {
      case typeof downloadSpecific == "undefined":
        this.res.send(await this.sensorClass.getByType(parameters)).status(200);
        break;
      case downloadSpecific == "download":
        fileHandler.createAndSendFile(
          "sensors_" + parameters,
          "csv",
          await this.sensorClass.getByType(parameters),
          this.res
        );
        break;
      default:
        this.res
          .send("Ungültiger zweiter Parameter nur download möglich")
          .status(400);
        break;
    }
  }

  checkIfHasAllProperties(object) {
    let hasAllProperties = true;
    for (let i = 0; i < this.properties.length; i++) {
      this.properties[i]
      if (!object.hasOwnProperty(this.properties[i])) return false;
    }
    return hasAllProperties;
  }

  checkValues(sensor) {
    let valuesOk = true;
    Object.values(sensor).forEach((values) => {
      if (!(values == null || values.length >= 5)) return false;
    });
    console.log("values OK")
    return valuesOk;
  }

  async sensorAlreadyExistsById(id) {
    let sensorExists = false;
    let result = await this.sensorClass.getById(id);
    if (!(typeof result[0] === "undefined")) sensorExists = true;
    return sensorExists;
  }

  async updateSensor(sensorBody, id) {
    // check ob der user mit derid existiert
    if (this.sensorAlreadyExistsById(id)) {
      if (this.checkIfHasAllProperties(sensorBody)) {
        if (this.checkValues(sensorBody)) {
          this.res.send(await this.sensorClass.update(sensorBody, id)).status(200);
        } else this.res.send("Invalid Values");
      } else this.res.send("Not all properties given").status(400);
    } else this.res.send("Sensor existiert nicht").status(400);
  }

  async createSensor(sensorBody) {
    if (this.checkIfHasAllProperties(sensorBody)) {
      console.log("properties ok");
      if (this.checkValues(sensorBody)) {
        this.res.send(await this.sensorClass.createSensor(sensorBody)).status(200);
        console.log("hi")
      } else this.res.status(400).send("Values can't be empty");
    } else this.res.status(400).send("Not All Properties given");
  }

  async deleteSensorById(id) {
    try {
      id = parseInt(id);
    } catch (error) {
      console.log("Konnte nicht geparsed werden!");
    }

    if (isNaN(id)) {
      this.res.send("Id is not a Number").status(400);
    } else {
      if (this.sensorAlreadyExistsById(id)) {
        this.res.send(await this.sensorClass.deleteById(id)).status(200);
      } else res.send("Existiert nicht").status(400);
    }
  }

  setParameters(parameters){
    this.parameters = parameters;
  }

  setDownloadSpecific(downloadSpecific){
    this.downloadSpecific = downloadSpecific;
  }

  setRes(res){
    this.res = res;
  }

}

module.exports = Sensorhandler;

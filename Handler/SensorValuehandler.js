const fileHandler = require("../Objects/FileHandler");

class SensorValuehandler {
    sensorValueClass; 
    properties;
    parameters;
    downloadSpecific;
    res;

    constructor(sensorValueClass){
        this.sensorValueClass = sensorValueClass;
    }

    async handleId(parameters, downloadSpecific) {
      switch (true) {
        case typeof downloadSpecific == "undefined":
          this.res.send(await this.sensorValueClass.getById(parameters)).status(200);
          break;
        case downloadSpecific == "download":
          fileHandler.createAndSendFile(
            "sensorValue_" + parameters,
            "csv",
            await this.sensorValueClass.getById(parameters),
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
        // this.properties[i]
        if (!object.hasOwnProperty(this.properties[i])) return false;
      }
      return hasAllProperties;
    }
  
    checkValues(sensorValue) {
      let valuesOk = true;
      Object.values(sensorValue).forEach((values) => {
        if (values == null) return false;
      });
      // console.log("values OK")
      return valuesOk;
    }
  
    async sensorValueAlreadyExistsById(id) {
      let sensorExists = false;
      let result = await this.sensorValueClass.getById(id);
      if (!(typeof result[0] === "undefined")) sensorExists = true;
      return sensorExists;
    }

    async createSensorValue(sensorValueBody) {
      if (this.checkIfHasAllProperties(sensorValueBody)) {
        console.log("properties ok");
        if (this.checkValues(sensorValueBody)) {
          this.res.send(await this.sensorValueClass.createSensorValue(sensorValueBody)).status(200);
        } else this.res.status(400).send("Values can't be empty");
      } else this.res.status(400).send("Not All Properties given");
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

module.exports = SensorValuehandler;
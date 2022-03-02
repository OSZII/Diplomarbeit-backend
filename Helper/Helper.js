const fastcsv = require("fast-csv");
const fs = require("fs");
const path = require("path");

class Helper {

    static notANumber = "Parameter must be a number";
    static largerThanZero = "Parameter must be larger than 0";
    static longerThan = "Parameter must be longer than: 3";
    static notFound = "No results matching to given Parameters could be found";
    static notAllProperties = "Not all properties given";
    static mustBeString = "Parameter must be String";

    static sendFileTimeout = 100;
    static deleteFileTimeout = 200;

    static createCSV(fileName){
      fs.writeFile(fileName, 'Learn Node FS module', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      });
    }

    static async searchById(parameters, object) {
      if (parameters > 0) {
        let receivedObject = await object.getById(parameters);
        if (receivedObject.length != 0) {
          return receivedObject;
        } else return [404, this.notFound];
      } else return [400, this.largerThanZero];
    }

    static async writeToCSV(data, fileName) {
      const ws = fs.createWriteStream(fileName);

      fastcsv.write(data, { headers: true }).on("finish", function() {
          console.log("Write to CSV successfully!");
        }).pipe(ws);
    }

    static hasOwnProperties(object, properties) {
      let result = true;
      for (let i = 0; i < properties.length; i++) {
        if (!object.hasOwnProperty(properties[i])) result = false;
      }
      return result;
    }

    static isNanArray(values) {
      let result = true;
      for (let i = 0; i < values.length; i++) {
        result &= isNaN(values[i]) | (values[i] == null);
      }
      return result;
    }
}

module.exports = Helper;

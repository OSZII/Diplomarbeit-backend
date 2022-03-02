const Help = require("../Helper/Helper");

const path = require("path");
const fs = require("fs");
const fastcsv = require("fast-csv");

sendFileTimeout = 100;
deleteFileTimeout = 200;

class FileHandler{
    static createAndSendFile(fileName, format, data, res) {
        fileName = fileName + "." + format;
        let filePath = path.join(__dirname, "..", fileName);
        if (format == "csv") {
          this.writeToCSV(data, fileName);
        }
        // return filePath;
        setTimeout(() => {
          res.status(200).download(filePath);
        }, sendFileTimeout);
        
        this.deleteFile(filePath);  
    }

    static deleteFile(filePath){
        setTimeout(() => {
          fs.unlink(filePath, () => {
            console.log("File:", filePath, "has been deleted");
          });
        }, deleteFileTimeout);
      }
      
    static async writeToCSV(data, fileName) {
      const ws = fs.createWriteStream(fileName);

      fastcsv.write(data, { headers: true }).on("finish", function() {
          console.log("Write to CSV successfully!");
        }).pipe(ws);
    }

}

module.exports = FileHandler;
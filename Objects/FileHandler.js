const app = require("../Routes/users");
const path = require("path");
const Help = require("../Helper/Helper");
const fs = require("fs");

class FileHandler{
    static createAndSendFile(fileName, format, data, res) {
        fileName = fileName + "." + format;
        let filePath = path.join(__dirname, "..", fileName);
        if (format == "csv") {
          Help.writeToCSV(data, fileName);
        }
        // return filePath;
        setTimeout(() => {
          res.status(200).download(filePath);
        }, Help.sendFileTimeout);
        
        this.deleteFile(filePath);  
    }

    static deleteFile(filePath){
        setTimeout(() => {
          fs.unlink(filePath, () => {
            console.log("File:", filePath, "has been deleted");
          });
        }, Help.deleteFileTimeout);
      }


}

module.exports = FileHandler;
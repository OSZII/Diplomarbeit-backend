var mariadb = require('mariadb');

const clc = require("cli-color");

let host, user, password, database;



if(process.env.NODE_ENV == "development"){
// Test Database
    // host = "127.0.0.1"
    host = "localhost"
    user = "root"
    password = "password"
    database = "floweraufdauer"
    console.log(clc.blue("Database connection set to DEVELOPMENT"))

}else if(process.env.NODE_ENV  == "production"){
  // // Production Database
    host = process.env.DATABASE_IP
    user = process.env.DATABASE_USER
    password = process.env.DATABASE_PASSWORD
    database = process.env.DATABASE_DATABASE
    console.log(clc.green("Database connection set to PRODUCTION"))
}else {
  console.log(clc.red("Check NODE_ENV enviroment variable"))
}

const pool = mariadb.createPool({
  host: host,
  user: user,
  password: password,
  database: database
})

module.exports = {
    getConnection: function(){
        return new Promise(function(resolve,reject){
          pool.getConnection().then(function(connection){
            resolve(connection);
          }).catch(function(error){
            reject(error);
          });
        });
      }
}
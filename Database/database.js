var mariadb = require('mariadb');

// // Test Database
// const pool = mariadb.createPool({
//     host: "127.0.0.1",
//     user: "root",
//     password: "password",
//     database: "floweraufdauer"
// })

// Production Database
const pool = mariadb.createPool({
  host: process.env.DATABASE_IP,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE
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
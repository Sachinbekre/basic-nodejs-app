// const mysql = require('mysql2');

// // create the connection to database
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password:'Rukku@9686',
//     database: 'nodejs-app'
//   });

// module.exports = db.promise();


const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodejs-app", "root", "Rukku@9686", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
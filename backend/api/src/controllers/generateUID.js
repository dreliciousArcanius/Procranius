const mysql = require('mysql');
const config = require('../configs/configuration.js')
const bcrypt = require('bcrypt');
const { isMailExist, isUsernameExist, isUIDExist } = require('./essentials.js');
const conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  });
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected with App...');
  });

module.exports = {
generateUID: async function(callback) {
    // generate random number from hundreds of thousand
    let rand = Math.floor(Math.random() * 1000000);
    var numberExist;
    // check if the random number is exist or not
    isUIDExist(rand, function(result) {
        if (result == true) {
            numberExist = true;
        } else {
            numberExist = false;
        }
    });
    // if the random number is exist, generate another random number
    while (numberExist == true) {
        rand = Math.floor(Math.random() * 1000000);
        isUIDExist(rand, function(result) {
            if (result == true) {
                numberExist = true;
            } else {
                numberExist = false;
            }
        });
    }
    // return the random number
    callback(rand);
},
}
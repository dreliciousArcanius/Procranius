const mysql = require('mysql');
const config = require('../configs/configuration.js');
const { apiKeyTest2, check4APIMYSQL, createTableNamedusers, createUser } = require('./checkAPIKey.js');
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


module.exports ={
    apiKeyTest: async function(req, res) {
        const key = req.body.apiKey;
        const ip = req.connection.remoteAddress;
        check4APIMYSQL(key, ip, function(result) {
            if (result == true) {
                res.send("API Key is valid");
            } else {
                res.send("API Key is invalid");
            }
        });
    },

    regUser: async function(req, res) {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const key = req.body.apiKey;
        const ip = req.connection.remoteAddress;
        check4APIMYSQL(key, ip, function(result) {
            if (result == true) {
                createUser(username, email, password, function(result) {
                    res.send(result);
                });
            } else {
                res.send("API Key is invalid");
            }
        });
    },

    


}

    
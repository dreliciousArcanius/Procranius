const mysql = require('mysql');
const config = require('../configs/configuration.js')
const bcrypt = require('bcrypt');
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
isMailExist: async function(email, callback) {
    let rest = "SELECT * FROM users WHERE email='" + email + "'";
    let resp = conn.query(rest, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            callback(true);
        } else {
            callback(false);
        }
    })
},

isUsernameExist: async function(username, callback) {
    let rest = "SELECT * FROM users WHERE username='" + username + "'";
    let resp = conn.query(rest, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            callback(true);
        } else {
            callback(false);
        }
    })},

isUIDExist: async function(uid, callback) {
    let rest = "SELECT * FROM users WHERE uid='" + uid + "'";
    let resp = conn.query(rest, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            callback(true);
        } else {
            callback(false);
        }
    })
}

}
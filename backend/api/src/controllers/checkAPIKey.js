const mysql = require('mysql');
const config = require('../configs/configuration.js')
const bcrypt = require('bcrypt');
const { isMailExist, isUsernameExist, isUIDExist } = require('./essentials.js');
const { generateUID } = require('./generateUID.js');
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
    // Skeleton To Check APIKEY VALID OR NAH
    check4APIMYSQL: async function(key, ip, callback) {
        let rest = "SELECT * FROM apiKey WHERE apiKey='" + key + "'";
        let resp = conn.query(rest, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        })
    },

    createUser: async function(username, email, password, callback) {
        // check if username/email/password is empty
        if (username == "" || email == "" || password == "") {
            callback("empty");
        } else {
        // check email and username is exist or not
        isMailExist(email, function(result) {
            if (result == true) {
                callback("exist_mail");
            } else {
                isUsernameExist(username, function(result) {
                    if (result == true) {
                        callback("exist_username");
                    } else {
                        // generate UID
                        generateUID(function(result) {
                            // insert the user into database
                            let rest = "INSERT INTO users (uid, username, email, password) VALUES ('" + result + "', '" + username + "', '" + email + "', '" + password + "')";
                            let resp = conn.query(rest, (err, result) => {
                                if (err) throw err;
                                callback("Success!");
                            })
                        });
    }})}})}
},


    loginUser: async function(username, password, email, callback) {
        // user can login with username or email only
        if (username == "" && email == "") {
            callback("empty");
        } else {
            if (username != "") {
                let rest = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
                let resp = conn.query(rest, (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    callback(true);
                } else {
                    callback(false);
                }      
                });
            } else {
                let rest = "SELECT * FROM users WHERE email='" + email + "' AND password='" + password + "'";
                let resp = conn.query(rest, (err, result) => {
                    if (err) throw err;
                    if (result.length > 0) {
                        callback(true);
                    } else {
                        callback(false);
                    } 
                });
            }}
    },




}


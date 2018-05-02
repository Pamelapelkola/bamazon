var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,

    user: "root",

    password: "Tyler123!",
    database: "great_baydb"
});
connection.connect(function(err) {
    if (err) throw err;
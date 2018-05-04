var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Tyler123!",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    shop();
});

function shop() {
    connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
    
            inquirer
                .prompt([
                    {
                    name: 'choice',
                    type: 'rawlist',
                    choices: function () {
                        var itemsArray = [];
                        for (var i = 0; i < results.length; i++) {
                            itemsArray.push(results[i].product_name);
                        }
                        return itemsArray;
                    },
                    message: 'Which item would you like to purchase?',
                }
            ])
        
    
                .then(function (answer) {
                    var chosenProduct;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].product_name === answer.choice) {
                            chosenProduct = results[i];
                        }
                    }
                })
            }
        )}

    function howManyAvail(){
               inquirer
               .prompt([
                name: "howmany",
                type: "input",
                choices: function () {
                    var qtyArray = [];
                    for (var i = 0; i < results.length; i++) {
                        qtyArray.push(results[i].);
                    }
                    return itemsArray;
                },
                message: "How many would you like?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
            )]
            .then(function(quantity){
                connection.query("SELECT * FROM products", function (err, results){

                }
            }
              }
            ])
        

    
    function cartTotal()
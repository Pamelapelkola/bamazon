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
                    name: 'item',
                    type: 'list',
                    message: 'Which item would you like to purchase?',
                    choices: function () {
                        var itemsArray = [];
                        for (var i = 0; i < results.length; i++) {
                            itemsArray.push(results[i].product_name);
                        }
                        return itemsArray;
                    },
                },
                {
                    name: 'qty',
                    type: 'input',
                    message: 'How many would you like?',
                    choices: function(value) {
                            if (isNaN(value) === false) {
                              return true;
                            }
                            return false;
                        }
                    }
                 ]) 
                    .then(function (answer) {
                    var chosenProduct;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].stock_qty === answer.qty) {
                            chosenProduct = results[i];
                        }
                    }
                })
            }
            // howManyAvail();
        )}

    // function howManyAvail(){
    //     connection.query("SELECT * FROM products WHERE stock_qty = ?", function (err, results){
    //         if (err) throw err;
    //     })
    //     for (var i = 0; i < results.length; i++){
    //         var qtyArray = [];
    //         if(results[i].stock_qty <= 0)
    //         return "This item is out of stock"

    //     }else{
    //         connection.query(
    //             "UPDATE stock_qty SET ? WHERE ?",
    //             [
    //                 {

    //                 },
    //                 {

    //                 },
    //             ]
    //         function()
    //     }
   
    //                 var qtyArray = [];
    //                 for (var i = 0; i < results.length; i++) {
    //                     qtyArray.push(results[i].);
    //                 }
    //                 return itemsArray;
    //             },
    //             message: "How many would you like?",
    //             validate: function(value) {
    //               if (isNaN(value) === false) {
    //                 return true;
    //               }
    //               return false;
    //             }
    //         )]
         
        

    
  
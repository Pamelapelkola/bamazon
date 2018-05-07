var mysql = require('mysql');
var inquirer = require('inquirer');
const keys = require("./keys");
const pw = keys.password.pw;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: pw,
    
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    shop();
});

function shop() {
    connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            var selectedqty;
            inquirer
                .prompt([
                    {
                    name: 'item',
                    type: 'rawlist',
                    message: 'Which item would you like to purchase?',
                    choices: function () {
                        var itemsArray = [];
                        for (var i = 0; i < results.length; i++) {
                           
                            itemsArray.push(`${results[i].item_id} || ${results[i].product_name}  || ${results[i].product_name}`);
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
                    var chosenProduct = '';
                    for(var i = 0; i < 4; i++){
                        chosenProduct += answer.item[i]
                        
                    }
                   
                    var set = {item_id:chosenProduct}
                    var sql = "SELECT * FROM products WHERE ?";
                    sql = mysql.format(sql, set);
                    var resobject = {}

                    connection.query({sql}, function (err, newresults) {
                    resobject.item_id = newresults[0].item_id
                    resobject.product_name = newresults[0].product_name
                    resobject.department_name = newresults[0].department_name
                    resobject.stock_qty = newresults[0].stock_qty
                    resobject.price = newresults[0].price
                    console.log(resobject.product_name);
                    var newqty = resobject.stock_qty-answer.qty 
                    var newset = {stock_qty:newqty}
                    var where = {item_id:resobject.item_id}
                    var inserts = [newset, where]
                    var sql = "UPDATE products SET ? WHERE ?";
                    sql = mysql.format(sql, inserts);

                    // connection.query({sql}, function (err, updateresults) {
                      
                    // })
                    
                    var priceqty = resobject.price*answer.qty
                    var priceset = {price:priceqty}
                    var pricewhere = {item_id:resobject.item_id}
                    
                    resobject.price = priceqty

                    if (answer.qty > resobject.stock_qty){
                        console.log('Sorry insufficient quantity');
                        shop();
                    }
                    
                    
                    else{
                    console.log("Your cart total is $" + priceqty);
                        
                    }
                    }) 
                  
                })
            })
        }
        
        
          
  

   
 
    
        

    

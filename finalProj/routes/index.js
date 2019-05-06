const fs = require('fs');
var ejs = require('ejs')
var express = require('express');
var router = express.Router()
let user = "NULL";
module.exports = {

    getBuy: (req, res) => {
      let q = "select B.CustomerId, B.ItemId, B.Quantity, B.Price, I.ItemName, I.ItemType, I.SellerId, B.PaymentId from Buys B, Item I where B.CustomerId = '" + user + "' and B.ItemId = I.ItemId;";
      db.query(q, (err, result) => {
        if(err) {
          return res.status(500).send(err);
        }
        console.log(result);


          res.render('transaction.ejs', {
            title: "Shopping Cart",
            Buys: result
          });


      });
    },

    getHome: (req, res) => {
        res.render('index.ejs', {
            title: "Database Designers Pro!"
        });

    },

    getItem: (req, res) => {

    	let ItemQ = "SELECT * FROM Item ORDER BY ItemID ASC";
		db.query(ItemQ, (err, result) => {
			if (err) res.redirect('/');

			res.render('list_items.ejs', {title: "List Items",
				Item: result
			});

		});
    },

    getSellerPage:  (req, res) => {
        let ItemQ = "SELECT * FROM Seller ORDER BY SellerId ASC";
        db.query(ItemQ, (err, result) => {
            if (err) res.redirect('/');

            res.render('list_sellers.ejs', {title: "List Sellers!",
                Seller: result
            });

        });
    },


    getSeller: (req, res) => {
    	let ItemQ = "SELECT * FROM Seller ORDER BY SellerId ASC";
		db.query(ItemQ, (err, result) => {
			if (err) res.redirect('/');

			res.render('list_sellers.ejs', {title: "List Sellers!",
				Seller: result
			});

		});
    },

    addSellerPage: (req, res) =>{
        res.render('add_seller.ejs', {
            title: "Add a Seller!",
            message: ''
        });
    },

    addSeller: (req, res) => {

        if(req.body.SellerName == ''){
            res.direct('list_sellers.ejs');
        }

        let message1 ='';
        let SellerName = req.body.SellerName;

        let nameQuery= "Select * from Seller where SellerName = '" + SellerName + "'";
        db.query(nameQuery, (err, result)=>{
            if(err){
                return res.status(500).send(err);
            }

            if(result.length >0 && SellerName != null){
                message1 = 'Name already exists in the database or is null';
                res.render('add_seller.ejs',{
                    message: message1,
                    title: "Add a Seller!"
                });

            } else {

                let query = "INSERT INTO Seller (SellerName) VALUES ('" + SellerName + "')";

                db.query(query, (err,result) => {
                    if(err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/list_Sellers');
                });
            }
        });
    },
    deleteSeller: (req, res) => {
        let SellerId = req.params.SellerId;

        let deleteUserQuery = 'DELETE FROM Seller WHERE SellerId = '+ SellerId;



                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/list_Sellers');
                });


    },

     deleteItem: (req, res) => {
        let ItemId = req.params.ItemId;

        let deleteUserQuery = 'DELETE FROM Item WHERE ItemId = '+ ItemId;



                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/list_Items');
                });


    },

    addItemPage: (req, res) =>{
        res.render('add_item.ejs', {
            title: "Add an Item!!!",
            message: ''
        });
    },

    addItem: (req, res) => {

        if(req.body.ItemName == '' || req.body.Price == '' || req.body.ItemType == '' || req.body.Quantity == '' || req.body.SellerId == ''){
            res.direct('list_items.ejs');
        }

        let message1 ='';
        let ItemName = req.body.ItemName;
        let Price = req.body.Price;
        let ItemType = req.body.ItemType;
        let Quantity = req.body.Quantity;
        let SellerId = req.body.SellerId;


         let query = "INSERT INTO Item (Price, ItemType,Quantity,ItemName, SellerId) VALUES (" + Price + ",'" + ItemType + "'," + Quantity + ",'" + ItemName + "'," + SellerId + ")";

                db.query(query, (err,result) => {
                    if(err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/list_Items');
                });


    },

    addBuy: (req, res) => {
      if(req.body.buyQuantity == '')
      {
        res.direct('list_items.ejs');
      }
      console.log(req.body);
      let quant = req.body.buyQuant;
      let id = req.body.ItemId;
      let price = req.body.ItemPrice;
      let curQuant = req.body.curQuant;
      console.log(quant);
      if(quant > curQuant)
      {
        message1 = 'Desried quantity  exceeds the current stock.';
        res.render('list_Items.ejs',{
            message: message1,
            title: "Value too high."
          });
        }
      else {
        let query = "insert into Buys (BuysId, CustomerId, ItemId, Quantity, Price, PaymentId) values (NULL, '" + user + "', " + id + ", " + quant + ", " + (price * quant) + ", NULL);" ;
          let q2 = "update Item I set I.Quantity = " + (curQuant - quant) + " where I.ItemId = " + id;
        db.query(query, (err, result) => {
          console.log(result);
          if(err){
            return res.status(500).send(err);
          }
          db.query(q2, (er, re) => {
            if(er) {
              return res.status(500).send(er);
            }
            let ItemQ = "SELECT * FROM Item ORDER BY ItemID ASC";
          db.query(ItemQ, (err, r) => {
            if (err) res.redirect('/');

            res.render('list_items.ejs', {title: "List Items",
              Item: r
            });
            });
          });

        });
      }

    },

    userLogin: (req,res) => {
        if(req.body.loginUser == null || req.body.loginPass == null || req.body.loginUser == '' || req.body.loginPass == '')
        {
          console.log("err at line 219");
            res.redirect("/");
        }else{

        console.log(req.body);
        let q = "select CustomerId from Customer where CustomerId = '" + req.body.loginUser + "' and Pass = 'SHA2(" + req.body.loginPass + ", 256)' ;";
        db.query(q, (err, result) => {
            if(err)
            {
              console.log(err);
             console.log("Error in UserLogin");
             console.log(result);
             console.log(req.body);
             res.redirect("/");
            }else{
              if(result == "")
              {
                console.log("not in db");
              }
            user = result[0].CustomerId;
            console.log(result);
            res.redirect("/");
          }

        });
      }
    },
    userReg: (req,res) => {
      console.log(req.body)
        if(req.body.regUser == '' || req.body.regPass == '')
        {
          console.log(req.body);
          res.redirect("/");
        }else{


        let q = "insert into Customer(CustomerId, Pass, FirstName, LastName, Address) values ('" + req.body.regUser + "', 'SHA2(" + req.body.regPass + ", 256)', NULL, NULL, NULL);";
        console.log(req.body);
        db.query(q, (err, result) => {
          if(err)
          {
            console.log("Error in UserReg");
            res.redirect("/");
          }else{


          console.log(result);
          console.log(req.body);
          user = req.body.regUser;
          console.log(user);
          res.redirect("/");
        }

        });
      }
    },

    signup: (req, res) =>{
       res.render('signup.ejs', {
            title: "Database Designers Pro Signup!"
        });


    },

    login: (req, res) =>{
       res.render('login.ejs', {
            title: "Database Designers Pro login!"
        });


    },

    goPurchase: (req, res) => {
      let q = "select SUM(Price) as Total from Buys where CustomerId = '" + user + "' and PaymentId is NULL;";
      db.query(q, (err, result) =>{
        if(err) {
          return res.status(500).send(er);
        }
        console.log(result);
        res.render('purchase.ejs', {
          title: 'Make Purchase',
          Total: result[0].Total
        });
      });
    }
};


       // let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

// execute query

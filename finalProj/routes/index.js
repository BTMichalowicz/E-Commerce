const fs = require('fs');
var ejs = require('ejs')
var express = require('express');
var router = express.Router()
module.exports = {


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
        let query = "insert into Buys (CustomerId, ItemId, Quantity, Price, PaymentId) values (1, " + id + ", " + quant + ", " + (price * quant) + ", NULL);" ;
          let q2 = "update Item I set I.Quantity = " + (curQuant - quant) + " where I.ItemId = " + id;
        db.query(query, (err, result) => {
          console.log(result);
          if(err){
            return res.status(500).send(err);
          }

          let ItemQ = "SELECT * FROM Item ORDER BY ItemID ASC";
        db.query(ItemQ, (err, r) => {
          if (err) res.redirect('/');

          res.render('list_items.ejs', {title: "List Items",
            Item: r
          });
          });
        });
      }

    }
};


       // let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query

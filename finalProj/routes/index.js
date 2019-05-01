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

            res.render('list_sellers.ejs', {title: "List Items",
                Seller: result
            });

        });
    },


    getSeller: (req, res) => {
    	let ItemQ = "SELECT * FROM Seller ORDER BY SellerId ASC";
		db.query(ItemQ, (err, result) => {
			if (err) res.redirect('/');

			res.render('list_sellers.ejs', {title: "List Items",
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


};
       // let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query
      
           
var fs = require('fs');
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
    	let ItemQ = "SELECT ItemId, ItemType, ItemName, Quantity, SellerId FROM Item ORDER BY ItemID ASC";
		db.query(ItemQ, (err, result) => {
			if (err) res.redirect('/');

			res.render('list_items.ejs', {title: "List Items",
				Item: result
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

    getPrices: (req, res) => {
        let ItemQ = "SELECT ItemId, Price FROM Item ORDER BY ItemId ASC";
        db.query(ItemQ, (err, result) => {
            if (err) res.redirect('/');

            res.render('see_price.ejs', {title: "See Prices!",
                Item: result
            });

        });
    },


};
       // let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query
      
           
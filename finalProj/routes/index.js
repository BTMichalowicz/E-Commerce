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
    	let ItemQ = "SELECT * FROM Item ORDER BY ItemID ASC";
		db.query(ItemQ, (err, res) => {
			if (err) res.redirect('/');
			res.render('list_items.ejs', {title: "List Items",
				Item: result
			});

		};
    },


};
       // let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query
      
           
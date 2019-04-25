var fs = require('fs');
var ejs = require('ejs')
var express = require('express');
var router = express.Router()
module.exports = function(app) {
       // let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query
      
            app.get('/', function(req, res){
               
                res.render('index.ejs', {
                title: "Database Designers Pro!!"});

            
            });
        
    };

const mysql=require('mysql');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//TODO: Have routing between pages a la tutorial


const port = 5000; //localhost:5000

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'DreamTheaterDrumset85!',

});

db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('Welcome to Database Designers Pro!');
});

db.query('drop database if exists myDB ;', (err) => {if(err) {throw err;} console.log("Using Relational Database");  } );
db.query('create Database myDB ;', (err) => {if(err) {throw err;} console.log("Using Relational Database");  } );
db.query('use myDB ;', (err) => {if(err) {throw err;} console.log("Using Relational Database");  } );

//db.query('use myDB ;', (err) => {if(err) {throw err;} console.log("Using Relational Database");  } );


//Table creation
db.query('CREATE TABLE Seller(SellerId INT AUTO_INCREMENT,  SellerName VARCHAR(64) DEFAULT "Anonymous", Primary Key(SellerId) );',(err) => {if(err) {throw err;} console.log( "Created Seller Table")});

db.query('drop database if exists myDB ;', (err) => {if(err) {throw err;} console.log("dropping Relational Database");  } );
//db.end()
const mysql=require('mysql');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//TODO: Have routing between pages a la tutorial

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


db.query('use myDB;', (err) => {if(err) {throw err;} console.log("Using Relational Database");  } );

db.end();
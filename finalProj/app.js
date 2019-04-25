const mysql=require('mysql');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//TODO: Have routing between pages a la tutorial


const port = 8080; //localhost:5000

const {getHomePage} = require('./routes/index'); //TODO: CREATE routes/index.js!!!
//const {addItem,sellItem,addCustomer,addSeller,doTransaction} = require('./routes/ecommerce') TODO: DO THIS!!


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

//db.query('drop database if exists myDB ;', (err) => {if(err) {throw err;} console.log("Dropping Relational Database");  } );
db.query('create Database if not exists myDB ;', (err) => {if(err) {throw err;} console.log("Creating Relational Database");  } );
db.query('use myDB ;', (err) => {if(err) {throw err;} console.log("Using Relational Database");  } );

//db.query('use myDB ;', (err) => {if(err) {throw err;} console.log("Using Relational Database");  } );


//Table creation
db.query('CREATE TABLE if not exists Seller(SellerId INT AUTO_INCREMENT,  SellerName VARCHAR(64) DEFAULT "Anonymous", Primary Key(SellerId) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Seller Table")});

db.query('CREATE TABLE if not exists Item(	ItemId INT AUTO_INCREMENT,    Price DECIMAL(10,2) DEFAULT 0.00,    ItemType VARCHAR(45) default \'\',    Quantity INT DEFAULT 0,    ItemName VARCHAR(45) default \'Item\',    SellerId INT NOT NULL,    Primary Key(ItemId),    Foreign Key(SellerId) References Seller(SellerId) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Item Table")});

db.query('CREATE TABLE if not exists Address(	AddId int auto_increment,	Address varchar(45) not null,    Town varchar(45) not null,    State char(2) not null,    ZIP int not null,    primary key(AddID) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Address Table")});

db.query('CREATE TABLE if not exists Customer(	CustomerId int auto_increment,    FirstName varchar(45) not null,    LastName varchar(45) not null,    Email varchar(45),    Address int,    primary key(CustomerId),     foreign key(Address) references Address(AddId)) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Customer Table")});

db.query('CREATE TABLE if not exists Reviews(	CustomerId int,    ItemId int,    Rating int not null,    Review varchar(256),    primary key(CustomerId, ItemId),    foreign key(CustomerId) references Customer(CustomerId),    foreign key(ItemId) references Item(ItemId) );', (err) => {if (err) {throw err;} console.log("Created Reviews Table")});

db.query('CREATE TABLE if not exists Shipment(	ShipmentId int auto_increment,    ShipmentAddress int not null,    ShipmentStatus char(9) not null,    primary key(ShipmentId),    check(ShipmentStatus in (\'ARRIVED\', \'PROCESSED\', \'SHIPPED\')),    foreign key(ShipmentAddress) references Address(AddID) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Shipment Table")})

db.query('CREATE TABLE if not exists Employee(	EmployeeId int auto_increment,    EmployeeRole varchar(64),    FirstName varchar(45) not null,    LastName varchar(45) not null,    Joined date not null,    SupervisorId int,    primary key(EmployeeId),    foreign key(SupervisorId) references Employee(EmployeeId),    check(SupervisorId != EmployeeId) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Employee Table")});

db.query('CREATE TABLE if not exists CreditCard(	Num bigint,    Own int not null,    PaymentType varchar(10) not null,    ExpirationDtae date not null,    Primary key(Num),    foreign key(Own) references Customer(CustomerId),     check(PaymentType in (\'MasterCard\', \'Visa\', \'Discover\', \'Chase\')) );',(err) => {if(err) {throw err;} console.log( "Created CreditCard Table")});

db.query('CREATE TABLE if not exists Payment(	PaymentId int auto_increment,    CreditCard bigint not null,	Amount decimal(10,2),     primary key(PaymentId),    foreign key(CreditCard) references CreditCard(Num) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Payment Table")});


db.query('CREATE TABLE if not exists Buys(	CustomerId int,    ItemId int,    Quantity int not null,    Price decimal(10,2),    PaymentId int,    primary key(CustomerId, ItemId),    foreign key(CustomerId) references Customer(CustomerId),    foreign key(ItemId) references Item(ItemId),    foreign key(PaymentId) references Payment(PaymentId) );', (err) => {if (err) {throw err;} console.log("Created Buys Table");});



global.db=db; //Global DB variable


//middleware
app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json);
app.use(express.static(path.join(__dirname, '/public')));
//app.use(fileUpload());


app.get('/', getHomePage);


app.listen(port, (err) =>{
	if(err){
		throw err;
	}
	console.log('Server running on port: ' + port);
});

//For testing purposes
//db.query('drop database if exists mydb;', (err) => {if(err) {throw err;} console.log("dropping Relational Database");});
//db.end();
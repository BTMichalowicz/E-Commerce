const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

 const {getHome, getItem, getSellerPage, getSeller, addSellerPage, addSeller, deleteSeller, deleteItem, addItemPage, addItem, addBuy, userLogin, userReg, getBuy, signup, login} = require('./routes/index');

const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'DreamTheaterDrumset85!',

});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
// db.query('drop Database myDB');
db.query('create Database if not exists myDB ;', (err) => {if(err) {throw err;} console.log("Creating Relational Database");  } );
db.query('use myDB ;', (err) => {if(err) {throw err;} console.log("Using Relational Database");  } );

//db.query('use myDB ;', (err) => {if(err) {throw err;} console.log("Using Relational Database");  } );


//Table creation
db.query('CREATE TABLE if not exists Seller(SellerId INT AUTO_INCREMENT,  SellerName VARCHAR(64) DEFAULT "Anonymous", Primary Key(SellerId) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Seller Table")});

db.query('CREATE TABLE if not exists Item(	ItemId INT AUTO_INCREMENT,    Price DECIMAL(10,2) DEFAULT 0.00,    ItemType VARCHAR(45) default \'\',    Quantity INT DEFAULT 0,    ItemName VARCHAR(45) default \'Item\',    SellerId INT NOT NULL,    Primary Key(ItemId),    Foreign Key(SellerId) References Seller(SellerId) ON DELETE NO ACTION ON UPDATE CASCADE) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Item Table")});

db.query('CREATE TABLE if not exists Address(	AddId int auto_increment,	Address varchar(45) not null,    Town varchar(45) not null,    State char(2) not null,    ZIP int not null,    primary key(AddID) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Address Table")});

db.query('CREATE TABLE if not exists Customer(	CustomerId varchar(45) not null, Pass varchar(64) not null, FirstName varchar(45),    LastName varchar(45),    Address int,    primary key(CustomerId),     foreign key(Address) references Address(AddId)) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Customer Table")});

db.query('CREATE TABLE if not exists Reviews(	CustomerId varchar(45),    ItemId int,    Rating int not null,    Review varchar(256),    primary key(CustomerId, ItemId),    foreign key(CustomerId) references Customer(CustomerId),    foreign key(ItemId) references Item(ItemId) );', (err) => {if (err) {throw err;} console.log("Created Reviews Table")});

db.query('CREATE TABLE if not exists Shipment(	ShipmentId int auto_increment,    ShipmentAddress int not null,    ShipmentStatus char(9) not null,    primary key(ShipmentId),    check(ShipmentStatus in (\'ARRIVED\', \'PROCESSED\', \'SHIPPED\')),    foreign key(ShipmentAddress) references Address(AddID) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Shipment Table")})

db.query('CREATE TABLE if not exists Employee(	EmployeeId int auto_increment,    EmployeeRole varchar(64),    FirstName varchar(45) not null,    LastName varchar(45) not null,    Joined date not null,    SupervisorId int,    primary key(EmployeeId),    foreign key(SupervisorId) references Employee(EmployeeId)) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Employee Table")});

db.query('CREATE TABLE if not exists CreditCard(	Num bigint,    Own varchar(45) not null,    PaymentType varchar(10) not null,    ExpirationDtae date not null,    Primary key(Num),    foreign key(Own) references Customer(CustomerId),     check(PaymentType in (\'MasterCard\', \'Visa\', \'Discover\', \'Chase\')) );',(err) => {if(err) {throw err;} console.log( "Created CreditCard Table")});

db.query('CREATE TABLE if not exists Payment(	PaymentId int auto_increment,    CreditCard bigint not null,	Amount decimal(10,2),     primary key(PaymentId),    foreign key(CreditCard) references CreditCard(Num) ) AUTO_INCREMENT=1;',(err) => {if(err) {throw err;} console.log( "Created Payment Table")});

db.query('CREATE TABLE if not exists Buys(	CustomerId varchar(45),    ItemId int,    Quantity int not null,    Price decimal(10,2),    PaymentId int,    primary key(CustomerId, ItemId),    foreign key(CustomerId) references Customer(CustomerId),    foreign key(ItemId) references Item(ItemId),    foreign key(PaymentId) references Payment(PaymentId) );', (err) => {if (err) {throw err;} console.log("Created Buys Table");});


global.db=db; //Global DB variable
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload


//middleware



app.get('/', getHome);
app.get('/list_Items', getItem);
app.get('/list_Sellers', getSellerPage);
app.get('/addSeller', addSellerPage);
app.post('/addSeller', addSeller);
app.get('/addItem', addItemPage);
app.post('/addItem', addItem);
app.post('/list_Sellers', getSeller);
app.get('/deleteSeller/:SellerId', deleteSeller);
app.get('/deleteItem/:ItemId', deleteItem);
app.post('/list_Items', addBuy);
app.post('/login', userLogin);
app.post('/signup', userReg);
app.get('/transaction', getBuy);
app.get('/login', login);
app.get('/signup', signup);


//db.query('drop database if exists mydb;', (err) => {if(err) {throw err;} console.log("dropping Relational Database");}); //For testing purposes
var server = app.listen(port, function(err){
	if(err){
		throw err;
	}
	console.log('Server running on port: ' + port);
});

//For testing purposes
//db.query('Drop Table if exists MyDB', (err) => {if (err){ throw err;} console.log("Database gone; goodbye");});;
//db.end();
//console.log("Goodbye");

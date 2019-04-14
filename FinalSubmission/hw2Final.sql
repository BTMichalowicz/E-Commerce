drop database if exists mydb;
create Database myDB;
use myDB;

CREATE TABLE Seller(
	SellerId INT AUTO_INCREMENT,
    SellerName VARCHAR(64) DEFAULT "Anonymous",
    Primary Key(SellerId) );

CREATE TABLE Item(
	ItemId INT AUTO_INCREMENT,
    Price DECIMAL(10,2) DEFAULT 0.00,
    ItemType VARCHAR(45) default '',
    Quantity INT DEFAULT 0,
    ItemName VARCHAR(45) default 'Item',
    SellerId INT NOT NULL,
    Primary Key(ItemId),
    Foreign Key(SellerId) References Seller(SellerId) );
    
create table Address(
	AddId int auto_increment,
	Address varchar(45) not null,
    Town varchar(45) not null,
    State char(2) not null,
    ZIP int not null,
    primary key(AddID) );
    
create table Customer(
	CustomerId int auto_increment,
    FirstName varchar(45) not null,
    LastName varchar(45) not null,
    Email varchar(45),
    Address int,
    primary key(CustomerId), 
    foreign key(Address) references Address(AddId));
 
create table Reviews(
	CustomerId int,
    ItemId int,
    Rating int not null,
    Review varchar(256),
    primary key(CustomerId, ItemId),
    foreign key(CustomerId) references Customer(CustomerId),
    foreign key(ItemId) references Item(ItemId) );
    
create table Shipment(
	ShipmentId int auto_increment,
    ShipmentAddress int not null,
    ShipmentStatus char(9) not null,
    primary key(ShipmentId),
    check(ShipmentStatus in ('ARRIVED', 'PROCESSED', 'SHIPPED')),
    foreign key(ShipmentAddress) references Address(AddID) );

create table Employee(
	EmployeeId int auto_increment,
    EmployeeRole varchar(64),
    FirstName varchar(45) not null,
    LastName varchar(45) not null,
    Joined date not null,
    SupervisorId int,
    primary key(EmployeeId),
    foreign key(SupervisorId) references Employee(EmployeeId),
    check(SupervisorId != EmployeeId) );
create table CreditCard(
	Num bigint,
    Own int not null,
    PaymentType varchar(10) not null,
    ExpirationDtae date not null,
    Primary key(Num),
    foreign key(Own) references Customer(CustomerId), 
    check(PaymentType in ('MasterCard', 'Visa', 'Discover', 'Chase')) );
create table Payment(
	PaymentId int auto_increment,
    CreditCard bigint not null,
	Amount decimal(10,2), 
    primary key(PaymentId),
    foreign key(CreditCard) references CreditCard(Num) );

create table Buys(
	CustomerId int,
    ItemId int,
    Quantity int not null,
    Price decimal(10,2),
    PaymentId int,
    primary key(CustomerId, ItemId),
    foreign key(CustomerId) references Customer(CustomerId),
    foreign key(ItemId) references Item(ItemId),
    foreign key(PaymentId) references Payment(PaymentId) );
    

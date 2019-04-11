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
    ItemType VARCHAR(45),
    Quantity INT DEFAULT 0,
    ItemName VARCHAR(45),
    SellerId INT NOT NULL,
    Primary Key(ItemId),
    Foreign Key(SellerId) References Seller(SellerId) );
    
create table Customer(
	CustomerId int auto_increment,
    FirstName varchar(45),
    LastName varchar(45),
    Email varchar(45),
    Address varchar(45),
    primary key(CustomerId) );
    
create table Reviews(
	CustomerId int,
    ItemId int,
    SellerId int,
    Rating int,
    Review varchar(256),
    primary key(CustomerId, ItemId, SellerId),
    foreign key(CustomerId) references Customer(CustomerId),
    foreign key(ItemId) references Item(ItemId),
    foreign key(SellerId) references Seller(SellerId) );
    
create table Shipment(
	ShipmentId int auto_increment,
    ShipmentAddress varchar(256),
    ZipCode int,
    ShipmentStatus char(9),
    primary key(ShipmentId),
    check(ShipmentStatus in ('ARRIVED', 'PROCESSED', 'SHIPPED')) );

create table Employee(
	EmployeeId int auto_increment,
    EmployeeRole varchar(64),
    FirstName varchar(45),
    LastName varchar(45),
    Joined date,
    SupervisorId int,
    primary key(EmployeeId),
    foreign key(SupervisorId) references Employee(EmployeeId),
    check(SupervisorId != EmployeeId) );

create table Payment(
    CreditCard int,
    PaymentType varchar(10) not null,
    ExpirationDtae date not null,
    primary key(CreditCard),
    check(PaymentType in ('MasterCard', 'Visa', 'Discover', 'Chase')) );

create table Buys(
	CustomerId int,
    ItemId int,
    Quantity int,
    Price decimal(10,2),
    PaymentId int,
    primary key(CustomerId, ItemId),
    foreign key(CustomerId) references Customer(CustomerId),
    foreign key(ItemId) references Item(ItemId),
    foreign key(PaymentId) references Payment(CreditCard) );
    

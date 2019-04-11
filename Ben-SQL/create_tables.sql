
CREATE DATABASE e_commerce ;
 USE  e_commerce;

-- - ----- ------------------------- Customer
CREATE TABLE Customer (
  customer_id INT NOT NULL,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  email_id VARCHAR(50) NOT NULL,
  phone_number DECIMAL (10, 0) NOT NULL,
  address VARCHAR(100) NOT NULL,
  UNIQUE (customer_id, phone_number, email_id),
  -- CHECK(phone_numer <= 99999999999 && phone_number >= 1000000000),
  PRIMARY KEY (customer_id) -- Assuming Phone numbers are a set valued realm
);

-- ----------------------------- Item, which references Customer

CREATE TABLE Item (
  article_ID INT,
  item_type VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  seller_id INT NOT NULL,
  UNIQUE(article_ID), -- Just as a check in case
  FOREIGN KEY (seller_id) REFERENCES Customer(customer_id),
  PRIMARY KEY (article_ID, price),
  CHECK (article_ID > 0),
  CHECK (price >0.00),
  CHECK (seller_id >0)

);

-- --------------------------------- Sells, which references Customer and Item
CREATE TABLE Sells (
  buyer_id INT NOT NULL,
  seller_id INT NOT NULL,
  article_ID INT NOT NULL,
  CHECK (buyer_id <> seller_id), -- Can't sell to yourself!! That'st just stupid :P
  FOREIGN KEY (buyer_id) REFERENCES Customer(customer_id),
  FOREIGN KEY (seller_id) REFERENCES Customer(customer_id),
  FOREIGN KEY (article_ID) REFERENCES Item(article_ID),
  PRIMARY KEY (buyer_id, seller_id, article_ID) -- I guess??
  -- Primary Key here??
);

-- --------------------------------- Inventory Table, which references Customer, which could be a seller ID of sorts, and an item ID as well
-- -- Primary Key is ALMOST the same as the foreign key

CREATE TABLE Inventory(
  item_ID INT NOT NULL,
  item_name VARCHAR(30) NOT NULL,
  quant INT NOT NULL,
  seller_ID INT NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  FOREIGN KEY (item_ID, price) REFERENCES Item(article_ID, price),
  FOREIGN KEY (seller_ID) REFERENCES Customer(customer_ID),
  CHECK(item_ID > 0),
  CHECK(quant >=0),
  CHECK(seller_ID <> item_ID), -- Weird case, but still...
  CHECK(price >0.00),
  PRIMARY KEY(item_ID, seller_ID) -- Hypothetically, a seller will have a consistent price for an item that they sell, right?
);




---------------------------------------- Review Table
CREATE TABLE Review(
  -- As if writing a review
  customer_ID INT NOT NULL,
  article_ID INT NOT NULL,
  item_Price DECIMAL(10, 2) NOT NULL,
  seller_ID INT NOT NULL,
  num_stars INT, -- Perhaps a starting point???
  CHECK (customer_ID <> seller_ID),
  review VARCHAR(500),
  CHECK (num_stars<=5 && num_stars >=1),
  FOREIGN KEY (customer_ID) REFERENCES Customer(customer_ID),
  FOREIGN KEY (seller_ID) REFERENCES Customer(customer_ID),
  FOREIGN KEY (article_ID, item_Price) REFERENCES Item(article_ID, price),
  PRIMARY KEY (customer_ID, article_ID, seller_ID)
);


-- --------------------------------------- Writes Relation between a customer and a review 
CREATE TABLE Writes(
  customer_ID INT NOT NULL,
  article_ID INT NOT NULL,
  seller_ID INT NOT NULL,
  item_price DECIMAL(10,2) NOT NULL,
  CHECK (item_price > 0.00),
  -- ratings INT NOT NULL,
  -- CHECK (ratings >=1 && ratings <=5),
  FOREIGN KEY (customer_ID) REFERENCES Customer(customer_ID),
  FOREIGN KEY (customer_ID, article_ID, seller_ID) REFERENCES Review (customer_id, article_id, seller_id),
  CHECK(customer_ID <> seller_ID),
  PRIMARY KEY (customer_ID, seller_ID)
);



-- ----------------------------------------Payment Table
CREATE TABLE Payment(
  credit_card BIGINT NOT NULL,
  UNIQUE(credit_card),
  expiration_date DATE NOT NULL,
  payment_type VARCHAR (20) NOT NULL, -- What is meant by this again? Set valued? Eh, I guess so
  CHECK (credit_card > 0),
  -- CHECK ( convert(VARCHAR(15), expiration_date, 102) > convert(VARCHAR(10), GETDATE(), 102)), -- Ensure that we have a valid card expiration date
  PRIMARY KEY (credit_card, payment_type)

);

-- ---------------------------------------- PaysWith Table
CREATE TABLE PaysWith(
  item_ID INT NOT NULL,
  credit_card BIGINT NOT NULL,
  payment_type VARCHAR(20) NOT NULL,
  customer_ID INT NOT NULL,
  FOREIGN KEY (customer_ID) REFERENCES Customer(customer_id),
  -- FOREIGN KEY item_ID REFERENCES Item,
  UNIQUE(credit_card),
  FOREIGN KEY (credit_card, payment_type) REFERENCES Payment(credit_card, payment_type),
  PRIMARY KEY (item_ID, credit_card, customer_ID)
);

-- --------------------------------------------Shopping Cart
CREATE TABLE ShoppingCart(
  final_price DECIMAL(10,2) NOT NULL,
  Items_Bought INT, -- Total number of items bought, also could just be a count of the number of rows in ShoppingCart
  quant_per_item INT, -- Number of items per item --> SELECT COUNT(*) from ShoppingCart S GROUP BY S.item_ID
  price_per_item DECIMAL(10,2) NOT NULL,
  item_ID INT NOT NULL, -- Perform a join with this and item and get the price of the item or maybe the Inventory 
  FOREIGN KEY (item_ID,price_per_item) references Item(article_id, price),
  CHECK (quantity >0),
  CHECK(price_per_item >0),
   -- TODO: FINISH THIS 
  PRIMARY KEY (item_ID, price_per_item, quant_per_item, final_price) -- I guess?!?!?
);

-- ----------------------------------------------- Contains --> For item versus shopping cart

CREATE TABLE Container(
  item_ID INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(4,2) NOT NULL,
  CHECK (quantity >=0),
  CHECK (item_ID >0),
  FOREIGN KEY (item_ID, price) REFERENCES Item(article_ID, price),
  PRIMARY KEY (item_ID, price)
);


-- -------------------------------------- StoredIn --> For Item in inventory
CREATE TABLE StoredIn(
  item_ID INT NOT NULL,
  seller_ID INT NOT NULL,
  quantity INT NOT NULL,
  CHECK (quantity >=0),
  CHECK (item_ID >0),
  CHECK (seller_ID>0),
  CHECK (item_ID <> seller_ID),
  PRIMARY KEY(item_ID, seller_ID)
);

-- ----------------------------- Shipment/Delivery Table


CREATE TABLE Shipment_Delivery(
  PhysicalAddress VARCHAR(100) NOT NULL,
  shipment_charge DECIMAL(5,2) NOT NULL,
  shipment_type VARCHAR(20) NOT NULL,
  shipment_details VARCHAR(500) NOT NULL,
  PRIMARY KEY(PhysicalAddress, shipment_charge, shipment_type)
);

-- ------- Ships-By Table references Shopping Cart

CREATE TABLE Shipsby(
  item_ID INT NOT NULL,
  item_PRICE DECIMAL(4,2) NOT NULL,
  items_bought INT NOT NULL,
  quant_per_item INT NOT NULL,
  FOREIGN KEY (item_ID, item_PRICE, quant_per_item) REFERENCES ShoppingCart(item_ID, price_per_item, quant_per_item),
  PRIMARY KEY (item_ID, item_PRICE, items_bought)
);


-- -------------------------------------------- 
-- - ------------------------------------------ Employee, Admin, Database-Admin, etc... How would I approach this??

CREATE TABLE worker(
	epl_ID INT NOT NULL,
    Designation VARCHAR(45) NOT NULL,
	date_joined DATE NOT NULL,
    PRIMARY KEY (epl_ID)
);

CREATE TABLE administrator(
    epl_ID INT NOT NULL,
    Designation VARCHAR(45) NOT NULL,
	date_joined DATE NOT NULL,
    FOREIGN KEY (epl_ID) REFERENCES worker(epl_ID),
    PRIMARY KEY (epl_ID)
);

CREATE TABLE db_admin(
    epl_ID INT NOT NULL,
    Designation VARCHAR(45) NOT NULL,
	date_joined DATE NOT NULL,
    FOREIGN KEY (epl_ID) REFERENCES worker(epl_ID),
    PRIMARY KEY (epl_ID)
);

CREATE TABLE employee(
	epl_ID INT NOT NULL,
    designation VARCHAR(45) NOT NULL,
    date_joined DATE NOT NULL,
    supervisor_ID INT NOT NULL,
    CHECK(epl_ID <> supervisor_ID),
    FOREIGN KEY (epl_ID) references worker(epl_ID),
    FOREIGN KEY (supervisor_ID) REFERENCES worker(epl_ID),
    PRIMARY KEY(epl_ID, supervisor_ID)
);


CREATE TABLE Oversee(
	empl_ID INT NOT NULL,
    item_ID INT NOT NULL,
    Seller_ID INT NOT NULL,
    supervisor_ID INT NOT NULL,
    CHECK (SellerID <> empl_ID), -- Weird case, but just to make sure
    CHECK (empl_ID >0),
    CHECK (Seller_ID >0),
    FOREIGN KEY (empl_ID, supervisor_ID) REFERENCES employee(epl_ID, supervisor_ID),
    FOREIGN KEY (item_ID, Seller_ID) REFERENCES Inventory(item_ID, seller_ID),
    PRIMARY KEY(empl_ID)
);


CREATE TABLE aids (
	empl_ID INT NOT NULL,
    customer_ID INT NOT NULL,
    supervisor_ID INT NOT NULL,
    FOREIGN KEY (empl_ID, supervisor_ID) REFERENCES employee(epl_ID, supervisor_ID),
    FOREIGN KEY (customer_ID) REFERENCES Customer(customer_ID),
    PRIMARY KEY (empl_ID, customer_ID)
);
    
    
	

    


    
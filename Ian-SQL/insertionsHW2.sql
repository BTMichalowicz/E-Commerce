use myDB;

insert into Seller values (null, "Adidas");
insert into Seller values (null, "Nike");
insert into Seller values (null, "Reebok");
insert into Seller values (null, "Champion");

insert into Item values (null, 20.95, 'Track Jacket', 50, 'Adidas Track Jacket Blue', (select SellerId from seller where SellerName = 'Adidas'));
insert into Item values (null, 15.05, 'Track Pants', 40, 'Adidas Track Pants Blue', (select SellerId from seller where SellerName = 'Adidas'));
insert into Item values (null, 78.00, 'Shoes', 25, 'Nike Air Max', (select SellerId from seller where SellerName = 'Nike'));
insert into Item values (null, 53.55, 'Shoes', 37, 'Nike Flex', (select SellerId from seller where SellerName = 'Nike'));
insert into Item values (null, 98.55, 'Shoes', 40, 'Reebok Lifestyle Leather', (select SellerId from seller where SellerName = 'Reebok'));
insert into Item values (null, 32.99, 'Shoe', 45, 'Reebok Club C Vintage', (select SellerId from seller where SellerName = 'Reebok'));
insert into Item values (null, 12.03, 'Sweatshirt', 48, 'Champion Sweatshirt Blue', (select SellerId from seller where SellerName = 'Champion'));
insert into Item values (null, 14.03, 'Sweatshirt', 60, 'Champion Sweatshirt Grey', (select SellerId from seller where SellerName = 'Champion'));

insert into Address values (null, '123 Lane St.', 'Stony Brook', 'NY', 11790);
insert into Address values (null, '444 Mann Rd.', 'Niantic', 'CT', 06357);

insert into Customer values (null, 'John', 'Doe', 'johndoe@email.com', (select AddId from Address where Address = '123 Lane St.' and Town = 'Stony Brook' and State = 'NY' and ZIP = 11790));
insert into Customer values (null, 'Man', 'McMann', 'man@manman.org', null);
insert into Customer values (null, 'Liam', 'Johnson', 'buddyman@hotmail.com', (select AddId from Address where Address = '444 Mann Rd.' and Town = 'Niantic' and State = 'CT' and ZIP = 06357));
insert into Customer values (null, 'Geoff', 'Hernandez', 'jeff@jeff.jeff', null);

insert into Reviews values (1, 2, 7, "They're comfortable pants.");
insert into Reviews values (3, 5, 3, null);
insert into Reviews values (2, 3, 8, 'Best. Shoes. Ever.');
insert into Reviews values (1, 3, 5, 'Could be better.');

insert into Shipment values (null, 1, 'SHIPPED');
insert into Shipment values (null, 2, 'ARRIVED');

insert into Employee values (null, 'Supervisor', 'Praveen', 'Tripathi', STR_TO_DATE('1-01-2019', '%m-%d-%Y'), null);
insert into Employee values (null, 'Programmer', 'Ian', 'Peitzsch', STR_TO_DATE('1-28-2019', '%m-%d-%Y'), 1);
insert into Employee values (null, 'Programmer', 'Ben', 'Benson', STR_TO_DATE('1-28-2019', '%m-%d-%Y'), 1);
insert into Employee values (null, 'Programmer', 'V', 'Vvvvvvvvvvvv', STR_TO_DATE('1-28-2019', '%m-%d-%Y'), 1);

insert into Payment values (11111111111, 'MasterCard', STR_TO_DATE('1-08-2022', '%d-%m-%Y'));
insert into Payment values (22222222222, 'Discover', STR_TO_DATE('1-02-2024', '%d-%m-%Y'));

insert into Buys values (1, 2, 1, 15.05, 11111111111);
insert into Buys values (2, 3, 1, 78.00, 22222222222);
insert into Buys values (4, 8, 3, 42.09, null);


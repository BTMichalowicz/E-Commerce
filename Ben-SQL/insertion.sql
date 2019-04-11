INSERT INTO Customer VALUES(1, "Ben", "Michalowicz", "b@gmail.com",  2019612280, "102 Spring Valley Road");
INSERT INTO Customer VALUES(2, "Praveen", "Tripathi", "bestProf@yahoo.com", 1234567890 ,"park Ridge New Jersy, 12");
INSERT INTO Customer VALUES (3, "Jack", "Sparrow", "vq@vq.com",  9914343870, "Mike Mangini Lane");
INSERT INTO Customer VALUES (4, "Adam", "Michalowicz", "adam@google.com",  9142348888, "Dream Theater Avenue Sd");

INSERT INTO Item VALUES(1, "Car", 4.45, 1);
Insert INTO Item VALUES (2, "Item12", 23.12, 2);
INSERT INTO Item VALUES (3, "Bike", 400.00, 1);
INSERT INTO Item VALUES (34, "Chopper", 40000.90, 4);

INSERT INTO Sells VALUES (1, 3, 1);
INSERT INTO Sells VALUES (4, 2, 3);
INSERT INTO Sells VALUES (1, 2, 3);
INSERT INTO Sells VALUES(2, 1, 34);

INSERT INTO Inventory VALUES (1, "Mercedes", 10, 1, 4.45);
INSERT INTO Inventory VALUES (2, "Jaguar", 10, 4, 23.12);
INSERT INTO Inventory VALUES (3, "Dut Dut", 10, 2, 400.00);
INSERT INTO Inventory VALUES (34, "34", 10, 4, 40000.90);

INSERT INTO Review VALUES (1, 1, 4.45, 3, 1, "This thing is dirt cheap and runs like it!");
INSERT INTO Review VALUES (2, 2, 23.12, 4, 2, "............");
INSERT INTO Review VALUES (3, 3, 400.00, 1, 3, "I can bike now!! A bit expensive");
INSERT INTO Review VALUES (4, 34, 40000.90, 2, 4, "It nyoom like no one's business");
-- Between writes and reviews, the seller, the buyer, and the item HAVE to be the same thing in order to refer to who's writing what about what and about whom
INSERT INTO Writes VALUES(1,1,3,4.45);
INSERT INTO Writes VALUES(2,2,4,23.12);
INSERT INTO Writes VALUES(3,3,1,400.00);
INSERT INTO Writes VALUES(4,34,2,40000.90);

INSERT INTO Payment VALUES (123456789019, '2023-11-24', "Venmo");
INSERT INTO Payment VALUES (123456789018, '2022-11-24', "Paypal");
INSERT INTO Payment VALUES (123456789017, '2021-11-24', "Drummer");

INSERT INTO PaysWith VALUES(1, 123456789019, "Venmo",1);
INSERT INTO PaysWith VALUES(1, 123456789018, "Paypal",2);
INSERT INTO PaysWith VALUES(1, 123456789017, "Drummer",3);




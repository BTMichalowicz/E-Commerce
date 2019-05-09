const fs = require('fs');
var ejs = require('ejs')
var express = require('express');
var router = express.Router()
let user = "GUEST";
let welcomeMessage = '';

module.exports = {


  deleteSeller: (req, res) => {
    let SellerId = req.params.SellerId;

    let deleteUserQuery = 'DELETE FROM Seller WHERE SellerId = '+ SellerId;



    db.query(deleteUserQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/list_Sellers');
    });


  },

  deleteItem: (req, res) => {
    let ItemId = req.params.ItemId;

    let deleteUserQuery = 'DELETE FROM Item WHERE ItemId = '+ ItemId;



    db.query(deleteUserQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/list_Items');
    });


  },



  getBuy: (req, res) => {

    if(user =="GUEST"){
      res.render('index.ejs',{
        title: "Database Designers Pro!",
        welcomeMessage: "Welcome, " + user,
        message: 'User not logged in!'
      });
    }else{
      let q = "select B.CustomerId, B.ItemId, B.Quantity, B.Price, I.ItemName, I.ItemType, I.SellerId, B.PaymentId from Buys B, Item I where B.CustomerId = '" + user + "' and B.ItemId = I.ItemId and B.PaymentId IS NULL;";
      db.query(q, (err, result) => {
        if(err) {
          return res.status(500).send(err);
        }
        let q1 = "select B.CustomerId, B.ItemId, B.Quantity, B.Price, I.ItemName, I.ItemType, I.SellerId, B.PaymentId from Buys B, Item I where B.CustomerId = '" + user + "' and B.ItemId = I.ItemId and B.PaymentId IS NOT NULL;";
        db.query(q1, (e, r) => {
          if(e){
            return res.status(500).send(e);
          }
          res.render('transaction.ejs', {
            title: "Shopping Cart",
            Buys: result,
            Purchase: r,
            welcomeMessage: "Welcome, " + user,
          });
        });

      });
    }

  },


  getHome: (req, res) => {

    res.render('index.ejs', {
      title: "Database Designers Pro!",
      message: '',
      welcomeMessage: "Welcome, " + user
    });

  },

  getItem: (req, res) => {

   let ItemQ = "SELECT * FROM Item ORDER BY ItemID ASC";
   db.query(ItemQ, (err, result) => {
     if (err) res.redirect('/');

     res.render('list_items.ejs', {title: "List Items",
      message: '',
      welcomeMessage: "Welcome, " + user,
      Item: result
    });

   });
 },

 getSellerPage:  (req, res) => {
  let ItemQ = "SELECT * FROM Seller ORDER BY SellerId ASC";
  db.query(ItemQ, (err, result) => {
    if (err) res.redirect('/');

    res.render('list_sellers.ejs', {title: "List Sellers!",
      Seller: result,
      welcomeMessage: "Welcome, " + user,
    });

  });
},


getSeller: (req, res) => {
 let ItemQ = "SELECT * FROM Seller ORDER BY SellerId ASC";
 db.query(ItemQ, (err, result) => {
   if (err) res.redirect('/');

   res.render('list_sellers.ejs', {title: "List Sellers!",
    Seller: result
  });

 });
},

addSellerPage: (req, res) =>{
  res.render('add_seller.ejs', {
    title: "Add a Seller!",
    message: '',
    welcomeMessage: "Welcome, " + user,
  });
},

addSeller: (req, res) => {

  if(req.body.SellerName == ''){
    res.direct('list_sellers.ejs');
  }

  let message1 ='';
  let SellerName = req.body.SellerName;

  let nameQuery= "Select * from Seller where SellerName = '" + SellerName + "'";
  db.query(nameQuery, (err, result)=>{
    if(err){
      return res.status(500).send(err);
    }

    if(result.length >0 && SellerName != null){
      message1 = 'Name already exists in the database or is null';
      res.render('add_seller.ejs',{
        message: message1,
        welcomeMessage: "Welcome, " + user,
        title: "Add a Seller!"
      });

    } else {

      let query = "INSERT INTO Seller (SellerName) VALUES ('" + SellerName + "')";

      db.query(query, (err,result) => {
        if(err) {
          return res.status(500).send(err);
        }
        res.redirect('/list_Sellers');
      });
    }
  });
},



addItemPage: (req, res) =>{
  res.render('add_item.ejs', {
    title: "Add an Item!!!",
    message: '',
    welcomeMessage: "Welcome, " + user
  });
},

addItem: (req, res) => {

  if(req.body.ItemName == '' || req.body.Price == '' || req.body.ItemType == '' || req.body.Quantity == '' || req.body.SellerId == ''){
    res.direct('/list_Items');
  }




  let message1 ='';
  let ItemName = req.body.ItemName;
  let Price = parseFloat(req.body.Price);
  let ItemType = req.body.ItemType;
  let Quantity = parseInt(req.body.Quantity);
  let SellerId = parseInt(req.body.SellerId);

  let SellCheck = "Select * from Seller where SellerId = " + SellerId;

  db.query(SellCheck, (err, res1)=>{
    if(err){ return res.status(500).send(err);}

    if(res1 <=0){
      res.render('add_item.ejs', {
        title:"Add an item!!!",
        message: 'No Seller for inserted Item',
        welcomeMessage: "Welcome, " + user
      });
    }else{

      let query2 = "SELECT * from Item where ItemName = '" + ItemName + "' AND Price = " + Price + " AND ItemType = '" +ItemType +"' AND SellerId = " + SellerId; //Quantity shouldn't matter in the event name, price, type, and SellerId are all identical

      db.query(query2, (err, result)=>{
        if(err){
          return res.status(500).send(err);
        }
        else if(Quantity < 0){
          res.render('add_item.ejs',{title: 'Add an Item!!', message: 'Item quantity cannot be negative.'});
        }else if(result.length > 0){
          res.render('add_item.ejs',{title: 'Add an Item!!', message: 'Duplicate Item Added!'});
        }else{

          let query = "INSERT INTO Item (Price, ItemType,Quantity,ItemName, SellerId) VALUES (" + Price + ",'" + ItemType + "'," + Quantity + ",'" + ItemName + "'," + SellerId + ")";

          db.query(query, (err,result) => {
            if(err) {
              return res.status(500).send(err);
            }
            res.redirect('/list_Items');
          });
        }
      });


    }
  });






},

addBuy: (req, res) => {
  if(req.body.buyQuantity == '')
  {
    res.direct('list_items.ejs');
  }

  let quant = parseInt(req.body.buyQuant);
  let id = req.body.ItemId;
  let price = req.body.ItemPrice;
  let curQuant = parseInt(req.body.curQuant);


 if(curQuant == 0)
 {

   let ItemQ = "SELECT * FROM Item ORDER BY ItemID ASC";
   db.query(ItemQ, (err, r) => {
    if (err) res.redirect('/');

    message1 = 'Selected item is out of stock.'
    res.render('list_Items.ejs',{
      message: message1,
      welcomeMessage: "Welcome, " + user,
      title: "Item Unavailable.",
      Item: r
    });
  });

 }

 else if(quant > curQuant)
 {


  let ItemQ = "SELECT * FROM Item ORDER BY ItemID ASC";
  db.query(ItemQ, (err, r) => {
    if (err) res.redirect('/');

    message1 = 'Selected item is out of stock.'
    res.render('list_Items.ejs',{
      message: message1,
      title: "Value too high",
      welcomeMessage: "Welcome, " + user,
      Item: r
    });
  });
}
else {




  let query = "insert into Buys (CustomerId, ItemId, Quantity, Price, PaymentId) values ("+ "'"+user + "', " + id + ", " + quant + ", " + (price * quant) + ", NULL);" ;
  let q2 = "update Item I set I.Quantity = " + (curQuant - quant) + " where I.ItemId = " + id;
  db.query(query, (err, result) => {

    if(err){
      return res.status(500).send(err);
    }
    db.query(q2, (er, re) => {
      if(er) {
        return res.status(500).send(er);
      }
      let ItemQ = "SELECT * FROM Item ORDER BY ItemID ASC";
      db.query(ItemQ, (err, r) => {
        if (err) res.redirect('/');

        res.render('list_items.ejs', {title: "List Items",
          message:'',
          Item: r,
          welcomeMessage: "Welcome, " + user,
        });
      });
    });
  });



}


},

userLogin: (req,res) => {
  if(req.body.loginUser == null || req.body.loginPass == null || req.body.loginUser == '' || req.body.loginPass == '')
  {

    res.redirect("/");
  }else{


    let q = "select CustomerId, Pass from Customer where CustomerId = '" + req.body.loginUser + "' and Pass = SHA2('" + req.body.loginPass + "', 256) ;";
    db.query(q, (err, result) => {
      if(err)
      {
        ;
        res.redirect("/");
      }else{
        if(result.length==0){
          //Bad username or password
          res.render("login.ejs", {
            title:"BAD CREDS",
            welcomeMessage: "Welcome, " + user,
            message: 'Login Information Not Found.'
          });
        }else{
          console.log(result);
          user = result[0].CustomerId;
          console.log(result[0].Pass);
          res.redirect("/");
        }
      }

    });
  }
},
userReg: (req,res) => {

  if(req.body.regUser == '' || req.body.regPass == '')
  {

    res.redirect("/");
  }else{


    let check = "select * from Customer where CustomerId = '" + req.body.regUser + "' and Pass = SHA2('" + req.body.regPass + "', 256);";

    db.query(check, (err1, result1)=>{
      if(err1){
        return res.status(500).send(err1);
      }

      if(result1.length > 0){
        res.render('signup.ejs', {
          title: 'Database Designers Pro Signup!',
          message: 'User already in Database!',
          welcomeMessage: "Welcome, " + user,
        });

      }else{
        let q = "insert into Customer(CustomerId, Pass, FirstName, LastName, Address) values ('" + req.body.regUser + "', SHA2('" + req.body.regPass + "', 256), NULL, NULL, NULL);";

        db.query(q, (err, result) => {
          if(err){

            res.redirect("/");
          }else{



            user = req.body.regUser;
            welcomeMessage= "Welcome, " + user;
            res.redirect("/");
          }

        });


      }
    });

  }
},

signup: (req, res) =>{
 res.render('signup.ejs', {
  title: "Database Designers Pro Signup!",
  message: '',
  welcomeMessage: "Welcome, " + user
});


},

login: (req, res) =>{
 res.render('login.ejs', {
  title: "Database Designers Pro login!",
  welcomeMessage: "Welcome, " + user
});


},

goPurchase: (req, res) => {

  if(user =="GUEST"){
    res.render('index.ejs',{
      title: "Database Designers Pro!",
      welcomeMessage: "Welcome, " + user,
      message: 'User not logged in!'
    });

  }else{let q = "select SUM(Price) as Total from Buys where CustomerId = '" + user + "' and PaymentId is NULL;";
  db.query(q, (err, result) =>{
    if(err) {
      return res.status(500).send(er);
    }
    let q1 = "select C.FirstName, C.LastName, A.Address, A.Town, A.State, A.ZIP from Customer C, Address A where C.CustomerId = '" + user + "' and C.Address = A.AddId;";
    db.query(q1, (e1, r1) => {
      if(e1) {
        return res.status(500).send(e1);
      }
      if(r1.length > 0)
      {
        console.log("has Address");
        console.log(r1);
        res.render('purchase.ejs', {
          title: 'Make Purchase',
          welcomeMessage: "Welcome, " + user,
          Total: result[0].Total,
          Address: r1[0].Address,
          Town: r1[0].Town,
          State: r1[0].State,
          Zip: r1[0].ZIP,
          First: r1[0].FirstName,
          Last: r1[0].LastName
        });
      }
      else {
        {
          console.log("NoAddress");
          res.render('purchase.ejs', {
            title: 'Make Purchase',
            welcomeMessage: "Welcome, " + user,
            Total: result[0].Total,
            Address: "",
            Town: "",
            State: "",
            Zip: "",
            First: "",
            Last: ""
          });
        }
      }
    });

  });
} },


makePurchase: (req, res) => {
  if(req.body.CCN == '' || req.body.CCN.length < 16|| req.body.type == null || req.body.type == "" || req.body.month == null || req.body.year == null || req.body.state.length < 2 || req.body.addr == '' || req.body.town == '' || req.body.state == '' || req.body.zip == '' || req.body.first == '' || req.body.last == '')
  {
    res.direct("purchase.ejs");
  }
  console.log("makePurchase");
  let m = req.body.month + '';
  if(req.body.month.length < 2)
  {
    m = '0' + m;
  }

  let q1 = 'select Num from CreditCard where Num = ' + req.body.CCN + ';';
  db.query(q1, (e1, r1) => {
    if(e1) {
      return res.status(500).send(e1);
    }
    db.beginTransaction();
    if(r1.length > 0) // already in db
    {
      let t = Date.now();
      let q3 = "insert into Payment(PaymentId, CreditCard, Amount, CustomerId) values (" + t + ", " + r1[0].Num + ", " + req.body.Total + ", '" + user + "');"
      db.query(q3, (e3, r3) => {
        if(e3) {
          db.rollback();
          console.log('payment: ' + e3);
          return res.status(500).send(e3);
        }
        let q4 = "update Buys B set B.PaymentId = " + t + " where B.PaymentId IS NULL and B.CustomerId = '" + user + "';";
        db.query(q4, (e4, r4) => {
          if(e4){
            db.rollback();
            console.log('Update: ' + e4);
            return res.status(500).send(e4);
          }
          let q5 = "select A.AddId from Address A where A.Address = '" + req.body.addr + "' and A.Town = '" + req.body.town + "' and A.State = '" + req.body.state.toUpperCase() + "' and A.ZIP = " + parseInt(req.body.zip) + ";";
          db.query(q5, (e5, r5) => {
            if(e5)
            {
              db.rollback();
              console.log('address: ' + e5);
              return res.status(500).send(e5);
            }
            if(r5.length > 0) // already has address in db
            {
              let q6 = "update Customer C set C.Address = " + r5[0].AddId + ", C.FirstName = '" + req.body.first + "', C.LastName = '" + req.body.last + "' where C.CustomerId = '" + user + "';";
              db.query(q6, (e6, r6) => {
                if(e6){
                  db.rollback();
                  return res.status(500).send(e6);
                }
                let q7 = "insert into Shipment(ShipmentId, ShipmentAddress, ShipmentStatus) values (NULL, " + r5[0].AddId + ", \'PROCESSED\');";
                db.query(q7, (e7, r7) => {
                  if(e7){
                    db.rollback();
                    return res.status(500).send(e7);
                  }
                  db.commit();
                  res.redirect('/');
                });
              });
            }
            else { // insert addr
              let q8 = "insert into Address(AddId, Address, Town, State, ZIP) values (NULL, '" + req.body.addr + "', '" + req.body.town + "', '" + req.body.state.toUpperCase() + "', " + parseInt(req.body.zip) + ");";
              db.query(q8, (e8, r8) => {
                if(e8){
                  db.rollback();
                  return res.status(500).send(e8);
                }
                let q9 = "select A.AddId from Address A where A.Address = '" + req.body.addr + "' and A.Town = '" + req.body.town + "' and A.State = '" + req.body.state.toUpperCase() + "' and A.ZIP = " + parseInt(req.body.zip) + ";";
                db.query(q9, (e9, r9) => {
                  if(e9)
                  {
                    db.rollback();
                    console.log('address: ' + e9);
                    return res.status(500).send(e9);
                  }

                    let q10 = "update Customer C set C.Address = " + r5[0].AddId + ", C.FirstName = '" + req.body.first + "', C.LastName = '" + req.body.last + "' where C.CustomerId = '" + user + "';";
                    db.query(q10, (e10, r10) => {
                      if(e10){
                        db.rollback();
                        return res.status(500).send(e10);
                      }
                      let q11 = "insert into Shipment(ShipmentId, ShipmentAddress, ShipmentStatus) values (NULL, " + r9[0].AddId + ", \'PROCESSED\');";
                      db.query(q11, (e11, r11) => {
                        if(e11){
                          db.rollback();
                          return res.status(500).send(e11);
                        }
                        db.commit();
                        res.redirect('/');
                      });
                    });

              });
            });
          }

        });
      });
    });
    }
    else { // new insert
      let q2 = "insert into CreditCard(Num, PaymentType, ExpirationDate) values (" + req.body.CCN + ", '" + req.body.type + "', + str_to_date('" + m + "-" + req.body.year + "', '%m-%Y'));"
      db.query(q2, (e2, r2) => {
        if(e2) {
          db.rollback();
          return res.status(500).send(e2);
        }
        let t = Date.now();

        let q3 = "insert into Payment(PaymentId, CreditCard, Amount, CustomerId) values (" + t + ", " + req.body.CCN + ", " + req.body.Total + ", '" + user + "');"
        db.query(q3, (e3, r3) => {
          if(e3) {
            db.rollback();
            console.log('payment: ' + e3);
            return res.status(500).send(e3);
          }
          let q4 = "update Buys B set B.PaymentId = " + t + " where B.PaymentId IS NULL and B.CustomerId = '" + user + "';";
          db.query(q4, (e4, r4) => {
            if(e4){
              db.rollback();
              console.log('Update: ' + e4);
              return res.status(500).send(e4);
            }
            let q5 = "select A.AddId from Address A where A.Address = '" + req.body.addr + "' and A.Town = '" + req.body.town + "' and A.State = '" + req.body.state.toUpperCase() + "' and A.ZIP = " + parseInt(req.body.zip) + ";";
            db.query(q5, (e5, r5) => {
              if(e5)
              {
                db.rollback();
                console.log('address: ' + e5);
                return res.status(500).send(e5);
              }
              if(r5.length > 0) // already has address in db
              {
                let q6 = "update Customer C set C.Address = " + r5[0].AddId + ", C.FirstName = '" + req.body.first + "', C.LastName = '" + req.body.last + "' where C.CustomerId = '" + user + "';";
                db.query(q6, (e6, r6) => {
                  if(e6){
                    db.rollback();
                    return res.status(500).send(e6);
                  }
                  let q7 = "insert into Shipment(ShipmentId, ShipmentAddress, ShipmentStatus) values (NULL, " + r5[0].AddId + ", \'PROCESSED\');";
                  db.query(q7, (e7, r7) => {
                    if(e7){
                      db.rollback();
                      return res.status(500).send(e7);
                    }
                    db.commit();
                    res.redirect('/');
                  });
                });
              }
              else { // insert addr
                let q8 = "insert into Address(AddId, Address, Town, State, ZIP) values (NULL, '" + req.body.addr + "', '" + req.body.town + "', '" + req.body.state.toUpperCase() + "', " + parseInt(req.body.zip) + ");";
                db.query(q8, (e8, r8) => {
                  if(e8){
                    db.rollback();
                    return res.status(500).send(e8);
                  }
                  let q9 = "select A.AddId from Address A where A.Address = '" + req.body.addr + "' and A.Town = '" + req.body.town + "' and A.State = '" + req.body.state.toUpperCase() + "' and A.ZIP = " + parseInt(req.body.zip) + ";";
                  db.query(q9, (e9, r9) => {
                    if(e9)
                    {
                      db.rollback();
                      console.log('address: ' + e9);
                      return res.status(500).send(e9);
                    }

                      let q10 = "update Customer C set C.Address = " + r9[0].AddId + ", C.FirstName = '" + req.body.first + "', C.LastName = '" + req.body.last + "' where C.CustomerId = '" + user + "';";
                      db.query(q10, (e10, r10) => {
                        if(e10){
                          db.rollback();
                          return res.status(500).send(e10);
                        }
                        let q11 = "insert into Shipment(ShipmentId, ShipmentAddress, ShipmentStatus) values (NULL, " + r9[0].AddId + ", \'PROCESSED\');";
                        db.query(q11, (e11, r11) => {
                          if(e11){
                            db.rollback();
                            return res.status(500).send(e11);
                          }
                          db.commit();
                          res.redirect('/');
                        });
                      });

                });
              });
            }

          });

          });
        });
      });
    }
  });


}
};

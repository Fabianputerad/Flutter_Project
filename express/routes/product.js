var express = require('express');
var router = express.Router();
var db = require('./connect');

var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
});

router.post('/new', function (req, res) {
  var id;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let imagePath = "images/";
  for (let i = 0; i < 10; i++) {
    const idx = Math.floor(Math.random() * characters.length);
    imagePath += characters.charAt(idx);
  }
  imagePath += ".jpg";
  const user_id = req.body.user_id;
  const product_type_id = req.body.product_type_id;
  const namee = req.body.namee;
  const description = req.body.description;
  const price = req.body.price;
  let query =
    `insert into products (user_id, product_type_id, name, description, price, image_path) 
  values ('${user_id}', '${product_type_id}', '${namee}', '${description}', ${price}, '${imagePath}')`;

  db.query(query, (err, result) => {
    if (err) throw err;
  })

  const image = req.body.image;

  fs.writeFile(`./public/${imagePath}`, Buffer.from(image, 'base64'), function (err) {
    if (err) throw err;
  });
  res.send("Ok");
});

router.post('/get', function(req, res) {
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;

  const query = 
  `SELECT product_type_id, name, description, price, image_path FROM products
  WHERE products.user_id = '${user_id}' AND products.id = '${product_id}'`;

  db.query(query, (err, result) =>{
    if(err) throw err;
    else res.send(result[0]);
  })
});


router.post('/edit', function (req, res) {
  const imagePath = req.body.imagePath;
  const selected_product_id = req.body.selected_product_id;
  const product_type_id = req.body.product_type_id;
  const namee = req.body.namee;
  const description = req.body.description;
  const price = req.body.price;
  let query =
    `update products 
    set product_type_id = ${product_type_id}, name = '${namee}', description = '${description}', price = ${price} 
    where products.id = ${selected_product_id}`;

  db.query(query, (err, result) => {
    if (err) throw err;
  })

  const image = req.body.image;

  fs.writeFile(`./public/${imagePath}`, Buffer.from(image, 'base64'), function (err) {
    if (err) throw err;
  });
  res.send("Ok");
});

router.post('/get', function(req, res) {
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;

  const query = 
  `SELECT product_type_id, name, description, price, image_path FROM products
  WHERE products.user_id = '${user_id}' AND products.id = '${product_id}'`;

  db.query(query, (err, result) =>{
    if(err) throw err;
    else res.send(result[0]);
  })
});


router.post('/getall', function(req, res) {
  const query = 
  `SELECT * FROM products`;
  
  db.query(query, (err, result) =>{
    if(err) throw err;
    else res.send(result);
  })
});

router.post('/update', function(req, res) {
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;

  const query = 
  `SELECT product_type_id, name, description, price, image_path FROM products
  WHERE products.user_id = '${user_id}' AND products.id = '${product_id}'`;

  db.query(query, (err, result) =>{
    if(err) throw err;
    res.send(result);
  })
});

router.post('/delete', function(req, res) {
  const product_id = req.body.product_id;

  const query = 
  `DELETE FROM products
  WHERE products.id = ${product_id}`;

  db.query(query, (err, result) =>{
    if(err) throw err;
    res.send(result);
  })
});

// router.post('/register', function(req, res) {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const email = req.body.email;
//   const username = req.body.username;
//   const password = req.body.password;
//   let token = "";
//   for(let i=0 ; i<10 ; i++){
//     const idx = Math.floor(Math.random() * characters.length);
//     token += characters.charAt(idx);
//   }
//   const query = `INSERT INTO users (email, username, password, token) values ('${email}', '${username}', '${password}', '${token}')`;
//   console.log(query);
//   db.query(query, (err, result) =>{
//     if(err) throw err;
//     res.send(result);

//   })
// });


module.exports = router;
var express = require('express');
var router = express.Router();
var db = require('./connect');

router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const query = 
  `SELECT * FROM users 
  WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, result) =>{
    if(err) throw err;
    if(result.length < 1) res.send(null);
    else res.send(result[0]);
    
  })
});

router.post('/googlelogin', function(req, res) {
  const email = req.body.email;

  const query = 
  `SELECT * FROM users 
  WHERE email = '${email}'`;

  db.query(query, (err, result) =>{
    if(err) throw err;
    if(result.length >= 1) res.send(result[0]);
    else 
    {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const email = req.body.email;
      let token = "";
      for(let i=0 ; i<10 ; i++){
        const idx = Math.floor(Math.random() * characters.length);
        token += characters.charAt(idx);
      }
      const query = `INSERT INTO users (email, username, password, token) values ('${email}', '${email}', '${token}', '${token}')`;
      db.query(query, (err, result) =>{
        if(err) throw err;
      
        const query = 
        `SELECT * FROM users 
        WHERE email = '${email}'`;
      
        db.query(query, (err, result) =>{
          if(err) throw err;
          if(result.length >= 1) res.send(result[0]);
          else res.send(null);
        })
      })
    }
  })
});


router.post('/register', function(req, res) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  let token = "";
  for(let i=0 ; i<10 ; i++){
    const idx = Math.floor(Math.random() * characters.length);
    token += characters.charAt(idx);
  }
  const query = `INSERT INTO users (email, username, password, token) values ('${email}', '${username}', '${password}', '${token}')`;
  console.log(query);
  db.query(query, (err, result) =>{
    if(err) throw err;
    res.send(result);
  })
});

router.post('/getname', function(req, res) {
  const userId = req.body.userId;
  const query = `SELECT username FROM users 
  WHERE id = ${userId}`;
  console.log(query);
  db.query(query, (err, result) =>{
    if(err) throw err;
    res.send(result[0].username);
  })
});


module.exports = router;
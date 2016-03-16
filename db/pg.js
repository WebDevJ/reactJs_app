'use strict';

require('dotenv').config();

const pgp = require('pg-promise')({
    // Initialization Options
});

// connection path
const cn = process.env.DATABASE_URL;
const db = pgp(cn);

const bcrypt           = require('bcrypt');
const salt             = bcrypt.genSaltSync(10);
const session          = require('express-session');

function createSecure(email, password, callback) {
  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash)
      // this callback saves the user to our database with the hashed password
      callback(email, hash)
    });
  });
};

function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser);
  console.log(req.body)
  function saveUser(email, hash) {
    // Get a Postgres client from the connection pool
    db.none("INSERT INTO users (email, password_digest) VALUES ($1, $2);",
      [email, hash])
      .then(function(data) {
        res.rows = data;
        next();
      })
      .catch(function(error){
        console.error(error);
      })
    }
  }

  function loginUser(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    db.one('SELECT * FROM users WHERE email LIKE ($1)', [email])
      .then(function(data) {
        console.log('data');
          if(bcrypt.compareSync(password, data.password_digest)){
            res.rows = data;
            next();
          }
          // else{
          //   res.rows = 'email and password do not match'
          //   next();
          // }
          res.status(401).json({data: 'email and password do not match'})
          next();
      })
      .catch(function(error){
        console.error('error finding users');
      })
  }



// export it
module.exports.createUser = createUser;
module.exports.createSecure = createSecure;

module.exports.loginUser = loginUser;

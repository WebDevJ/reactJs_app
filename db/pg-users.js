'use strict';

require('dotenv').config();

const pgp = require('pg-promise')({
    // Initialization Options
});

const cn = process.env.DATABASE_URL;
const db = pgp(cn);

const bcrypt = require('bcrypt');
const salt   = bcrypt.genSaltSync(10);

function createSecure(first, last, city, email, password, callback) {

  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      callback(first, last, city, email, hash)
    });
  });
};

function createUser(req, res, next) {
  createSecure(req.body.first, req.body.last, req.body.city, req.body.email, req.body.password, saveUser);
  console.log(req.body)
  function saveUser(first, last, city, email, hash) {

    db.none("INSERT INTO users (first, last, city, email, password_digest) VALUES ($1, $2, $3, $4, $5);",
      [req.body.first, req.body.last, req.body.city, email, hash])
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

          res.status(401).json({data: 'email and password do not match'})
          next();
      })
      .catch(function(error){
      })
  }

  function userInfo(req, res, next){
    db.any(`SELECT email, first, last, city FROM users WHERE user_id = $1`, [req.user.user_id])
    .then(function(data) {
      res.rows = data[0];
      next();
    })
    .catch(function(error){
    })
}


module.exports.createUser = createUser;
module.exports.createSecure = createSecure;
module.exports.loginUser = loginUser;

module.exports.userInfo = userInfo;

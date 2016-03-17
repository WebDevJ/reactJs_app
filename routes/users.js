const express    = require('express');
const users      = express.Router();
const secret     = process.env.SECRET;
const db         = require('../db/pg');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt        = require('jsonwebtoken');

users.get('/', (req,res) => {
  res.json({data: 'success'})
})

users.get('/me',(req, res) => {
  // var user = jwt.decode(req.headers.authorization, secret);
  res.json({data: res.rows, agent: req.user})
})

users.post('/', db.createUser, (req, res) => {
  res.status(201).json({data: 'success'})
})

users.post('/login', db.loginUser, (req, res) => {
  var token = jwt.sign(res.rows, secret)
  res.json({
    agent: res.rows,
    token: token
  })

})

module.exports = users;

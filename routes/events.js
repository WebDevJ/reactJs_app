'use strict';

const express = require('express');
const events  = express.Router();
const secret  = process.env.SECRET;
const db      = require('../db/pg');
const request = require('request');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt        = require('jsonwebtoken');

// get all events for the logged in user
events.get('/me', expressJWT({secret: secret}), db.showUserEvents, (req, res) => {
  res.send(res.rows)
})

events.route('/:event_id')
  // show one event
  .get(db.showOneEvent, (req, res) => {
    res.send(res.rows)
  })
  // delete event from user list
  .delete((req, res) => {
    res.send(res.rows)
  })

events.route('/')
  // get all events
  .get(db.showCommEvents, (req, res) => {
    res.send(res.rows)
  })
  // add an event
  .post((req, res) => {
    res.send(res.rows)
  })


///events/search/:term/:catid/:city/:state/:country
events.route('/search/')
  .get((req, res) => {
    request({url:'', qs:{t: req.params.t}, json:true},
      function(err, apires, body) {
        res.send(body)
    });
  })

module.exports = events;

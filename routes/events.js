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
  .get(expressJWT({secret: secret}), db.showOneEvent, (req, res) => {
    res.send(res.rows)
  })
  // delete event from user list
  .delete(expressJWT({secret: secret}), db.deleteUserEvent, (req, res) => {
    res.send(res.rows)
  })
  // add event to user list
  .post(expressJWT({secret: secret}), db.addUserEvent, (req, res) => {
    res.send(res.rows)
  })

events.route('/')
  // get all events
  .get(expressJWT({secret: secret}), db.showCommEvents, (req, res) => {
    res.send(res.rows)
  })
  // add an event to the community event list
  .post((req, res) => {
    res.send(res.rows)
  })

events.route('/search/') ///events/search/:term/:catid/:city/:state/:country
  .get((req, res) => {
    request({url:'', qs:{t: req.params.t}, json:true},
      function(err, apires, body) {
        res.send(body)
    });
  })

module.exports = events;

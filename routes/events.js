'use strict';

const express = require('express');
const events  = express.Router();
const secret  = process.env.SECRET;
const db      = require('../db/pg');
const request = require('request');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt        = require('jsonwebtoken');

const api_key = process.env.API_KEY;

// get all events for the logged in user
events.get('/me', expressJWT({secret: secret}), db.showUserEvents, (req, res) => {
  res.send(res.rows)
})

events.route('/search/') ///events/search/qs
  .get((req, res) => {
    // set the query object on the search route with the API_KEY
    const queryObj = req.query;
    queryObj.key = api_key;

    // pull request to get the JSON results from meetup
    request({url:'https://api.meetup.com/2/open_events', qs:queryObj, json:true},
      function(err, request, body) {
        res.send(body.results)
    });
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



module.exports = events;

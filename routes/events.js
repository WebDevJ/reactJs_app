const express = require('express');
const events  = express.Router();
const db      = require('../db/pg');
const request = require('request');

events.route('/')
  .get((req, res) => {
    res.send(res.rows)
  })
  .post((req, res) => {
  })

events.route('/:events_id')
  .get((req, res) => {
    res.send(res.rows)
  })

  .put((req, res) => {
    res.send(res.rows)
  })

  .delete((req, res) => {
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

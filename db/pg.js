'use strict';

require('dotenv').config();

const pgp = require('pg-promise')({
    // Initialization Options
});

const cn = process.env.DATABASE_URL;
const db = pgp(cn);

// render all events where the date is after today,
// with users attached to it
// date after today and users still needs to be worked on
function showCommEvents(req, res, next) {
  db.any(`SELECT e.*, c.cat_name
  FROM events as e
  INNER JOIN categories as c
  ON c.cat_meetup_id = e.cat_meetup_id;`)
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

// show one event, with users attached to it
function showOneEvent(req, res, next) {
  db.any(`SELECT e.*, c.cat_name
  FROM events as e
  INNER JOIN categories as c
  ON c.cat_meetup_id = e.cat_meetup_id
  WHERE event_id = $/event_id/`, req.params)
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

// show user list of events

// remove an event from the user list of events

// add an event to the user list of events



// exports
module.exports.showCommEvents = showCommEvents;
module.exports.showOneEvent = showOneEvent;

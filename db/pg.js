'use strict';

require('dotenv').config();

const pgp = require('pg-promise')({
    // Initialization Options
});

const cn = process.env.DATABASE_URL;
const db = pgp(cn);

// render all events where the date is after today,
// and show users who have added it to their lists
function showCommEvents(req, res, next) {
  db.any(`SELECT e.*, c.cat_name, array_agg(u.email) as users
    FROM events as e
      INNER JOIN categories as c
      ON c.cat_meetup_id = e.cat_meetup_id
      LEFT JOIN events_join as j
      ON j.event_id = e.event_id
      LEFT JOIN users as u
      ON j.user_id = u.user_id
    WHERE e.event_time > now()
    GROUP BY e.event_id, c.cat_name;`)
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
} // end of show CommEvents

// show one event, with users attached to it
function showOneEvent(req, res, next) {
  db.any(`SELECT e.*, c.cat_name, array_agg(u.email) as users
    FROM events as e
      INNER JOIN categories as c
      ON c.cat_meetup_id = e.cat_meetup_id
      LEFT JOIN events_join as j
      ON j.event_id = e.event_id
      LEFT JOIN users as u
      ON j.user_id = u.user_id
    WHERE e.event_id = $/event_id/
    GROUP BY e.event_id, c.cat_name;`, req.params)
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
} // end of show one event

// show user list of events

// remove an event from the user list of events

// add an event to the user list of events

// add an event to the community list of events



// exports
module.exports.showCommEvents = showCommEvents;
module.exports.showOneEvent = showOneEvent;

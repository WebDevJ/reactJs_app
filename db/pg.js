'use strict';

require('dotenv').config();

const pgp = require('pg-promise')({
    // Initialization Options
});

const cn = process.env.DATABASE_URL;
const db = pgp(cn);

// render all events where the date is after today,
// show users who have added it to their lists, and show the person it was added by
function showCommEvents(req, res, next) {
  db.any(`SELECT e.*, c.cat_name, users.first, users.last, array_agg(u.email) as attendees, array_agg(u.user_id) as userIDs
    FROM events as e
      INNER JOIN categories as c
      ON c.cat_meetup_id = e.cat_meetup_id
      LEFT JOIN events_join as j
      ON j.event_id = e.event_id
      LEFT JOIN users as u
      ON j.user_id = u.user_id
      INNER JOIN users
      ON e.added_by = users.user_id
    WHERE e.event_time > now()
    GROUP BY e.event_id, c.cat_name, users.first, users.last;`)
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
  db.any(`SELECT e.*, c.cat_name, users.first, users.last, array_agg(u.email) as attendees, array_agg(u.user_id) as userIDs
    FROM events as e
      INNER JOIN categories as c
      ON c.cat_meetup_id = e.cat_meetup_id
      LEFT JOIN events_join as j
      ON j.event_id = e.event_id
      LEFT JOIN users as u
      ON j.user_id = u.user_id
      INNER JOIN users
      ON e.added_by = users.user_id
    WHERE e.event_id = $/event_id/
    GROUP BY e.event_id, c.cat_name, users.first, users.last;`, req.params)
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
} // end of show one event

// show user list of events that have been added by the user or that they are attending
function showUserEvents(req, res, next) {
  console.log(req);
  db.any(`SELECT e.*, c.cat_name, users.first, users.last, array_agg(u.email) as attendees, array_agg(u.user_id) as userIDs
    FROM events as e
      INNER JOIN categories as c
      ON c.cat_meetup_id = e.cat_meetup_id
      LEFT JOIN events_join as j
      ON j.event_id = e.event_id
      LEFT JOIN users as u
      ON j.user_id = u.user_id
      INNER JOIN users
      ON e.added_by = users.user_id
    GROUP BY e.event_id, c.cat_name, users.first, users.last
    HAVING e.added_by = $1 OR
      (SELECT $1 = ANY (array_agg(u.user_id)::int[]));`, [req.user.user_id])
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
} // end of show user events

// remove an event from the user list of events
function deleteUserEvent(req, res, next) {
  db.none(`DELETE FROM events_join
    WHERE user_id=$1 AND event_id=$2`,
    [req.user.user_id, req.params.event_id])
    .then(function(data) {
      res.rows = data;
      next();
    })
    .catch(function (error) {
      console.error(error);
    });
};

// add an event to the user list of events
function addUserEvent(req, res, next) {
  db.one(`INSERT INTO events_join (user_id, event_id)
    VALUES ($1, $2) RETURNING *`,
    [req.user.user_id, req.params.event_id])
    .then(function(data) {
      res.rows = data;
      next();
    })
    .catch(function (error) {
      console.error(error);
    });
}; // end of addUserEvent

// add an event to the community list of events
function addCommEvent(req, res, next) {
  db.one(`INSERT INTO events (added_by, event_name, cat_meetup_id, event_time, address, lon, lat, city, state, country)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [req.user.user_id, req.body.added_by, req.body.event_name, req.body.cat_meetup_id, req.body.event_time, req.body.address, req.body.lon, req.body.lat, req.body.city, req.body.state, req.body.country])
    .then(function(data) {
      res.rows = data;
      next();
    })
    .catch(function (error) {
      console.error(error);
    });
}



// exports
module.exports.showCommEvents = showCommEvents;
module.exports.showOneEvent = showOneEvent;
module.exports.showUserEvents = showUserEvents;
module.exports.deleteUserEvent = deleteUserEvent;
module.exports.addUserEvent = addUserEvent;
module.exports.addCommEvent = addCommEvent;

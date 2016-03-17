

-- get all events with category name,
-- and users where the date of the event is after the query
-- combined - this gets me the results I want
SELECT e.*, c.cat_name, users.first, users.last, array_agg(u.email) as attendees
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
GROUP BY e.event_id, c.cat_name, users.first, users.last;


-- SELECT e.*, c.cat_name, u.first, array_agg(u.email) as attendees
-- FROM events as e
--   INNER JOIN categories as c
--   ON c.cat_meetup_id = e.cat_meetup_id
--   LEFT JOIN events_join as j
--   ON j.event_id = e.event_id
--   LEFT JOIN users as u
--   ON j.user_id = u.user_id
-- WHERE e.event_time > now()
-- GROUP BY e.event_id, c.cat_name, u.first;
--
--
-- -- community query with just the person who added the event
-- SELECT DISTINCT e.*, c.cat_name, u.email
-- FROM events as e
--   INNER JOIN categories as c
--   ON c.cat_meetup_id = e.cat_meetup_id
--   LEFT JOIN events_join as j
--   ON j.event_id = e.event_id
--   INNER JOIN users as u
--   ON j.user_id = u.user_id
-- WHERE e.event_time > now();
--
-- -- community query with the attendees of the event, without the person adding the event
-- SELECT e.*, c.cat_name, array_agg(u.email) as attendees
-- FROM events as e
--   INNER JOIN categories as c
--   ON c.cat_meetup_id = e.cat_meetup_id
--   LEFT JOIN events_join as j
--   ON j.event_id = e.event_id
--   INNER JOIN users as u
--   ON j.user_id = u.user_id
-- WHERE e.event_time > now()
-- GROUP BY e.event_id, c.cat_name;



-- show one event
SELECT e.*, c.cat_name, users.first, users.last, array_agg(u.email) as users
FROM events as e
  INNER JOIN categories as c
  ON c.cat_meetup_id = e.cat_meetup_id
  LEFT JOIN events_join as j
  ON j.event_id = e.event_id
  LEFT JOIN users as u
  ON j.user_id = u.user_id
  INNER JOIN users
  ON e.added_by = users.user_id
WHERE e.event_id = 1
GROUP BY e.event_id, c.cat_name, users.first, users.last;

-- show list of events added by a user
SELECT e.*, c.cat_name, array_agg(u.email) as users
FROM events as e
  INNER JOIN categories as c
  ON c.cat_meetup_id = e.cat_meetup_id
  LEFT JOIN events_join as j
  ON j.event_id = e.event_id
  LEFT JOIN users as u
  ON j.user_id = u.user_id
WHERE u.user_id = 1
GROUP BY e.event_id, c.cat_name;

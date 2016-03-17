-- SELECT m.title, array_agg(s.showtime)
-- FROM movies as m
-- INNER JOIN showtimes as s
-- ON m.movie_id = s.movie_id
-- GROUP BY m.title;

-- get all events - just with categories for now - users and date need to be added
SELECT e.*, c.cat_name, array_agg(j.user_id) as userids
FROM events as e
INNER JOIN categories as c
ON c.cat_meetup_id = e.cat_meetup_id
INNER JOIN events_join as j
ON j.event_id = e.event_id
GROUP BY e.event_id, c.cat_name;


-- show one event - just with categories for now - needs to be updated
SELECT e.*, c.cat_name
FROM events as e
INNER JOIN categories as c
ON c.cat_meetup_id = e.cat_meetup_id
WHERE event_id = 1;

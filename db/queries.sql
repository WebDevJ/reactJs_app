-- SELECT m.title, array_agg(s.showtime)
-- FROM movies as m
-- INNER JOIN showtimes as s
-- ON m.movie_id = s.movie_id
-- GROUP BY m.title;

-- get all events - just with categories for now - users need to be added
SELECT e.*, c.cat_name
FROM events as e
INNER JOIN categories as c
ON c.cat_meetup_id = e.cat_meetup_id;

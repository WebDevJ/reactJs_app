INSERT INTO categories (cat_meetup_id, cat_name) VALUES (34, 'Tech');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (1, 'Arts & Culture');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (4, 'Community & Environment');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (10, 'Food & Drink');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (15, 'Hobbies & Crafts');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (21, 'Music');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (23, 'Outdoors & Adventure');

-- ADD NEW EVENT
INSERT INTO events
  (event_name, event_time, cat_meetup_id, description, address, lon, lat, city, state, event_url)
VALUES
  ('Indie Coworking Space', '2016-03-18T15:00:00-04:00', 34, NULL, '350 West Broadway', -74.003693, 40.722824, 'New York', 'NY', 'http://www.meetup.com/New-York-Game-Makers/events/228630002/');

INSERT INTO events
  (event_name, event_time, cat_meetup_id, description, address, lon, lat, city, state, event_url)
VALUES
  ('NYC Bootcampers Anonymous', 'Wed Mar 23 2016 15:00:00', 34, NULL, '902 Broadway, 8th floor', -73.989288, 40.739391, 'New York', 'NY', 'http://www.meetup.com/NYC-Bootcampers-Anonymous/events/229343014/');

INSERT INTO events
  (event_name, event_time, cat_meetup_id, description, address, lon, lat, city, state, event_url)
VALUES
  ('A Different NYC Bootcampers Anonymous That already happened', 'Wed Mar 4 2016 15:00:00', 34, NULL, '902 Broadway, 8th floor', -73.989288, 40.739391, 'New York', 'NY', 'http://www.meetup.com/NYC-Bootcampers-Anonymous/events/229343014/');

-- ADD EVENT TO USER
INSERT INTO events_join (event_id, user_id) VALUES (1,1);
INSERT INTO events_join (event_id, user_id) VALUES (2,2);
INSERT INTO events_join (event_id, user_id) VALUES (1,3);

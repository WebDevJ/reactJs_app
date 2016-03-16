INSERT INTO categories (cat_meetup_id, cat_name) VALUES (34, 'Tech');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (1, 'Arts & Culture');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (4, 'Community & Environment');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (10, 'Food & Drink');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (15, 'Hobbies & Crafts');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (21, 'Music');
INSERT INTO categories (cat_meetup_id, cat_name) VALUES (23, 'Outdoors & Adventure');

INSERT INTO events
  (event_name, event_time, cat_meetup_id, description, address, lon, lat, city, state, event_url)
VALUES
  ('Indie Coworking Space', 1458136800000, 34, NULL, '350 West Broadway', -74.003693, 40.722824, 'New York', 'NY', 'http://www.meetup.com/New-York-Game-Makers/events/228630002/');

INSERT INTO events
  (event_name, event_time, cat_meetup_id, description, address, lon, lat, city, state, event_url)
VALUES
  ('New York SEO Meetup Group', 1458154800000, 34, NULL, ' ', -73.9800033569336, 40.75, 'New York', 'NY', 'http://www.meetup.com/new-york-seo/events/229472845/');

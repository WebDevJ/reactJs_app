DROP TABLE if EXISTS categories, users, events, events_join;

-- cat meetup id is the Primary key needed to join to other tables
CREATE TABLE categories (
  cat_id SERIAL UNIQUE,
  cat_meetup_id integer PRIMARY KEY UNIQUE,
  cat_name text
);

-- needs to be loaded after categories
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY UNIQUE,
  first VARCHAR(255),
  last VARCHAR(255),
  city VARCHAR(255),
  email VARCHAR(255),
  password_digest VARCHAR(255),
  admin boolean DEFAULT FALSE
);

-- needs to be loaded after categories
CREATE TABLE events (
  event_id SERIAL PRIMARY KEY UNIQUE,
  event_name text,
  event_time numeric,
  description text,
  cat_meetup_id integer REFERENCES categories(cat_meetup_id),
  address text,
  lon numeric,
  lat numeric,
  city text DEFAULT 'New York',
  state CHAR(2) DEFAULT 'NY',
  country text DEFAULT 'US',
  event_url text,
  user_id integer REFERENCES users
);


CREATE TABLE events_join (
  event_id integer REFERENCES events,
  user_id integer REFERENCES users
);

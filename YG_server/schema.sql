DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS channels;

-- TODO: figure out if first name and last name will be fetched seperatly
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- categories created by user for their subscriptions
CREATE TABLE categories (
  category_id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,

  FOREIGN KEY (author_id) REFERENCES user (id)
);

-- channel will relate user and category (user has category, category has channels)
CREATE TABLE channels (
  channel_id INTEGER PRIMARY KEY AUTOINCREMENT,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,

  fk_category INTEGER NOT NULL,
  fk_user INTEGER NOT NULL,

  -- FOREIGN KEY <name of foreign key in table> REFERENCES <table> <column in table>
  -- TODO: figure out if composition table is needed
  FOREIGN KEY (fk_category) REFERENCES categories (category_id),
  FOREIGN KEY (fk_user) REFERENCES users (user_id)
);

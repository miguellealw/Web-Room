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
  -- author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,

  -- reference to user
  FOREIGN KEY (author_id) REFERENCES user (id)
);

-- channel will relate user and category (user has category, category has channels)
CREATE TABLE channels (
  channel_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,

  fk_category INTEGER NOT NULL,
  fk_user INTEGER NOT NULL,

  -- FOREIGN KEY <name of column in table> REFERENCES <other table> <column in other table>
  -- TODO: figure out if composition table is needed
  FOREIGN KEY (fk_category) REFERENCES categories (category_id),

  -- TODO: figure out if relating to user is necessary b/c channels will be fetchable from the YouTube API
  FOREIGN KEY (fk_user) REFERENCES users (user_id)
);

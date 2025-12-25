const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./healthwallet.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    type TEXT,
    date TEXT,
    vitals TEXT,
    file_path TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS vitals (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    bp TEXT,
    sugar TEXT,
    heart_rate TEXT,
    date TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS shared_reports (
  id INTEGER PRIMARY KEY,
  report_id INTEGER,
  shared_with_email TEXT,
  permission TEXT
)`);

});

module.exports = db;

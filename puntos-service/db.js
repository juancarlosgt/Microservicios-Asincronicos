// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./puntos.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS puntos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clienteId INTEGER NOT NULL,
      puntos INTEGER NOT NULL
    )
  `);
});

module.exports = db;

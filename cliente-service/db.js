// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./clientes.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL,
      fechaRegistro TEXT NOT NULL
    )
  `);
});

module.exports = db;

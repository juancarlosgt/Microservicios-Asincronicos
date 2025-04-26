// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./envios.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS envios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clienteId INTEGER NOT NULL,
      estado TEXT NOT NULL,
      fechaSolicitud TEXT NOT NULL
    )
  `);
});

module.exports = db;

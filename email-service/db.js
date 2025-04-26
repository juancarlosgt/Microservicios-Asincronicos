// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./emails.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS correos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clienteId INTEGER NOT NULL,
      email TEXT NOT NULL,
      asunto TEXT NOT NULL,
      cuerpo TEXT NOT NULL,
      enviado BOOLEAN NOT NULL
    )
  `);
});

module.exports = db;

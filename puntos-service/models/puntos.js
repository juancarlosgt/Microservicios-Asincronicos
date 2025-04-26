// models/puntos.js
const db = require('../db');

function crearPuntos(clienteId, callback) {
  const stmt = db.prepare('INSERT INTO puntos (clienteId, puntos) VALUES (?, ?)');
  stmt.run(clienteId, 0, function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, clienteId, puntos: 0 });
  });
}
function obtenerPuntos(callback) {
  db.all('SELECT * FROM puntos', (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = {
  crearPuntos,
  obtenerPuntos
};

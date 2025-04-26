// models/envio.js
const db = require('../db');

function crearEnvio(clienteId, fechaSolicitud, callback) {
  const stmt = db.prepare('INSERT INTO envios (clienteId, estado, fechaSolicitud) VALUES (?, ?, ?)');
  stmt.run(clienteId, 'pendiente', fechaSolicitud, function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, clienteId, estado: 'pendiente', fechaSolicitud });
  });
}

module.exports = {
  crearEnvio
};

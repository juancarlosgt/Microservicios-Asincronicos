// models/correos.js
const db = require('../db');

function guardarCorreo(clienteId, email, asunto, cuerpo, enviado, callback) {
  const stmt = db.prepare('INSERT INTO correos (clienteId, email, asunto, cuerpo, enviado) VALUES (?, ?, ?, ?, ?)');
  stmt.run(clienteId, email, asunto, cuerpo, enviado ? 1 : 0, function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, clienteId, email, asunto, cuerpo, enviado });
  });
}

module.exports = {
  guardarCorreo
};

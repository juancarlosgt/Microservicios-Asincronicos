// models/cliente.js
const db = require('../db');

function crearCliente(nombre, email, fechaRegistro, callback) {
  const stmt = db.prepare('INSERT INTO clientes (nombre, email, fechaRegistro) VALUES (?, ?, ?)');
  stmt.run(nombre, email, fechaRegistro, function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, nombre, email, fechaRegistro });
  });
}
function obtenerClientes(callback) {
  db.all('SELECT * FROM clientes', (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = {
  crearCliente,
  obtenerClientes
};

// routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const { crearCliente } = require('../models/cliente');
const { publishClienteCreado } = require('../rabbitmq');

router.post('/clientes', (req, res) => {
  const { nombre, email } = req.body;
  const fechaRegistro = new Date().toISOString();

  crearCliente(nombre, email, fechaRegistro, (err, cliente) => {
    if (err) {
      return res.status(500).json({ error: 'Error creando cliente' });
    }

    // Publicar evento a RabbitMQ
    publishClienteCreado(cliente);

    res.status(201).json(cliente);
  });
});

module.exports = router;

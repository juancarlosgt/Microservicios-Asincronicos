// app.js
const express = require('express');
const app = express();
require('dotenv').config();
const { connectRabbitMQ } = require('./rabbitmq');
const { obtenerPuntos } = require('./models/puntos');
app.get('/puntos', (req, res) => {
  obtenerPuntos((err, puntos) => {
    if (err) return res.status(500).json({ error: 'Error al obtener puntos' });
    res.json(puntos);
  });
});

const PORT = process.env.PORT || 3001;

async function start() {
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Puntos Service escuchando en puerto ${PORT}`);
  });
}

start();

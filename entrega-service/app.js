// app.js
const express = require('express');
const app = express();
require('dotenv').config();
const { connectRabbitMQ } = require('./rabbitmq');
const { obtenerEntregas } = require('./models/envio');
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3002;
app.get('/entregas', (req, res) => {
  obtenerEntregas((err, entregas) => {
    if (err) return res.status(500).json({ error: 'Error al obtener entregas' });
    res.json(entregas);
  });
});

async function start() {
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Entrega Service escuchando en puerto ${PORT}`);
  });
}

start();

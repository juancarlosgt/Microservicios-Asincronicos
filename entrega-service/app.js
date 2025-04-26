// app.js
const express = require('express');
const app = express();
require('dotenv').config();
const { connectRabbitMQ } = require('./rabbitmq');

const PORT = process.env.PORT || 3002;

async function start() {
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Entrega Service escuchando en puerto ${PORT}`);
  });
}

start();

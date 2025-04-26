// app.js
const express = require('express');
const app = express();
require('dotenv').config();
const { connectRabbitMQ } = require('./rabbitmq');

const PORT = process.env.PORT || 3001;

async function start() {
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Puntos Service escuchando en puerto ${PORT}`);
  });
}

start();

// app.js
const express = require('express');
const app = express();
require('dotenv').config();
const { connectRabbitMQ } = require('./rabbitmq');

const PORT = process.env.PORT || 3003;

async function start() {
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Email Service escuchando en puerto ${PORT}`);
  });
}

start();

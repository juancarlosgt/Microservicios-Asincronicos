// app.js
const express = require('express');
const app = express();
require('dotenv').config();
const { connectRabbitMQ } = require('./rabbitmq');
const clienteRoutes = require('./routes/clienteRoutes');

app.use(express.json());
app.use('/api', clienteRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Cliente Service escuchando en puerto ${PORT}`);
  });
}

start();

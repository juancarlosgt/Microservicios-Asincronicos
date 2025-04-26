// rabbitmq.js
const amqp = require('amqplib');
require('dotenv').config();

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertExchange(process.env.EXCHANGE_NAME, 'fanout', { durable: true });
  console.log('Conectado a RabbitMQ');
}

function publishClienteCreado(cliente) {
  const msg = Buffer.from(JSON.stringify(cliente));
  channel.publish(process.env.EXCHANGE_NAME, '', msg);
  console.log('Evento ClienteCreado publicado');
}

module.exports = {
  connectRabbitMQ,
  publishClienteCreado
};

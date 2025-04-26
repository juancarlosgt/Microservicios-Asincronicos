// rabbitmq.js
const amqp = require('amqplib');
require('dotenv').config();
const { crearPuntos } = require('./models/puntos');

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(process.env.EXCHANGE_NAME, 'fanout', { durable: true });
  const q = await channel.assertQueue(process.env.QUEUE_NAME, { durable: true });
  await channel.bindQueue(q.queue, process.env.EXCHANGE_NAME, '');

  console.log('Puntos Service conectado a RabbitMQ, esperando mensajes...');

  channel.consume(q.queue, async (msg) => {
    if (msg !== null) {
      const cliente = JSON.parse(msg.content.toString());
      console.log('Mensaje recibido en Puntos Service:', cliente);

      await crearPuntos(cliente.id, (err, res) => {
        if (err) {
          console.error('Error creando puntos:', err);
        } else {
          console.log('Puntos creados para cliente:', res);
        }
      });

      channel.ack(msg);
    }
  });
}

module.exports = {
  connectRabbitMQ
};

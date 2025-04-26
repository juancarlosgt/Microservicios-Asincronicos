// rabbitmq.js
const amqp = require('amqplib');
require('dotenv').config();
const { crearEnvio } = require('./models/envio');

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(process.env.EXCHANGE_NAME, 'fanout', { durable: true });
  const q = await channel.assertQueue(process.env.QUEUE_NAME, { durable: true });
  await channel.bindQueue(q.queue, process.env.EXCHANGE_NAME, '');

  console.log('Entrega Service conectado a RabbitMQ, esperando mensajes...');

  channel.consume(q.queue, async (msg) => {
    if (msg !== null) {
      const cliente = JSON.parse(msg.content.toString());
      console.log('Mensaje recibido en Entrega Service:', cliente);

      const fechaSolicitud = new Date().toISOString();

      await crearEnvio(cliente.id, fechaSolicitud, (err, res) => {
        if (err) {
          console.error('Error creando envío:', err);
        } else {
          console.log('Envío creado para cliente:', res);
        }
      });

      channel.ack(msg);
    }
  });
}

module.exports = {
  connectRabbitMQ
};

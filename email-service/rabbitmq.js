// rabbitmq.js
const amqp = require('amqplib');
require('dotenv').config();
const { enviarCorreo } = require('./email');
const { guardarCorreo } = require('./models/correos');

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(process.env.EXCHANGE_NAME, 'fanout', { durable: true });
  const q = await channel.assertQueue(process.env.QUEUE_NAME, { durable: true });
  await channel.bindQueue(q.queue, process.env.EXCHANGE_NAME, '');

  console.log('Email Service conectado a RabbitMQ, esperando mensajes...');

  channel.consume(q.queue, async (msg) => {
    if (msg !== null) {
      const cliente = JSON.parse(msg.content.toString());
      console.log('Mensaje recibido en Email Service:', cliente);

      const asunto = '¡Bienvenido a nuestra plataforma!';
      const cuerpo = `Hola ${cliente.nombre},\n\nGracias por registrarte en nuestra plataforma. ¡Esperamos que disfrutes tu experiencia!\n\nSaludos`;

      try {
        await enviarCorreo(cliente.email, asunto, cuerpo);

        guardarCorreo(cliente.id, cliente.email, asunto, cuerpo, true, (err, res) => {
          if (err) {
            console.error('Error guardando correo:', err);
          } else {
            console.log('Correo guardado en base de datos:', res);
          }
        });
      } catch (error) {
        console.error('Error enviando correo:', error);
      }

      channel.ack(msg);
    }
  });
}

module.exports = {
  connectRabbitMQ
};

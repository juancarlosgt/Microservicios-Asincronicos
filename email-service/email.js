// email.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Usamos STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function enviarCorreo(destinatario, asunto, cuerpo) {
  const info = await transporter.sendMail({
    from: `"Registro de Clientes" <${process.env.SMTP_USER}>`,
    to: destinatario,
    subject: asunto,
    text: cuerpo
  });

  console.log('Correo enviado:', info.messageId);
  return info;
}

module.exports = {
  enviarCorreo
};

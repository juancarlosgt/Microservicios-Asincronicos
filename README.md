# 🎯 Microservices Async Architecture con RabbitMQ

Demostracion de una arquitectura de microservicios asincrónica utilizando Node.js, Express, SQLite, RabbitMQ y Docker Compose.

## 🧱 Microservicios

- 🧑 cliente-service: Crea un cliente y emite el evento.
- 🎁 entrega-service: Crea el envío del paquete de bienvenida.
- ⭐ puntos-service: Inicializa los puntos de lealtad.
- 📧 email-service: Envía un correo de bienvenida usando Gmail.
- 🐇 RabbitMQ: Broker de mensajes para comunicación asincrónica.

## ⚙️ Tecnologías

- Node.js + Express
- SQLite
- RabbitMQ (Exchange tipo fanout)
- Docker + Docker Compose
- Nodemailer (Gmail)
- AMQP (amqplib)


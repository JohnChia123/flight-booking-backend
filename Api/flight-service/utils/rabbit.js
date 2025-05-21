const amqp = require('amqplib');

const RABBIT_URL = process.env.AMQP_URL || 'amqp://localhost';

async function publishToQueue(queueName, message) {
  const conn = await amqp.connect(RABBIT_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  console.log(`[x] Sent message to queue "${queueName}"`);
  setTimeout(() => conn.close(), 500); // give it time to flush
}

module.exports = {
  publishToQueue
};

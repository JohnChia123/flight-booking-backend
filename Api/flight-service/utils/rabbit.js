const connectToRabbitMQ = require('./rabbitConnect');

async function publishToQueue(queueName, message) {
  try {
    const { conn, channel } = await connectToRabbitMQ();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log(`[x] Sent message to queue "${queueName}"`);
    setTimeout(() => conn.close(), 500);
  } catch (err) {
    console.error('❌ Failed to publish message:', err.message);
  }
}

module.exports = {
  publishToQueue,
};

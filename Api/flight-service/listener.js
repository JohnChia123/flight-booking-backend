const amqp = require('amqplib');

const RABBIT_URL = process.env.AMQP_URL || 'amqp://localhost';
console.log('🔁 LISTENER SERVICE UPDATED YAY');
console.log('🔁 LISTENER SERVICE RELOADED');
async function start() {
  try {
    const conn = await amqp.connect(RABBIT_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue('flight_created', { durable: true });

    console.log('[*] Waiting for messages in flight_created...');
    channel.consume('flight_created', (msg) => {
      const data = JSON.parse(msg.content.toString());
      console.log(`[>] Received flight:`, data);
      channel.ack(msg);
    });
  } catch (err) {
    console.error('❌ Failed to initialize listener:', err.message);
    process.exit(1);
  }
}

start();


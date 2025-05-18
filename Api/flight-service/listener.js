const connectToRabbitMQ = require('./utils/rabbitConnect');
console.log('🔁 LISTENER SERVICE UPDATED YAY');
console.log('🔁 LISTENER SERVICE RELOADED');
async function start() {
  try {
    const { conn, channel } = await connectToRabbitMQ();

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


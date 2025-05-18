// utils/rabbitConnect.js
const amqp = require('amqplib');

const RABBIT_URL = process.env.AMQP_URL || 'amqp://localhost';

async function connectToRabbitMQ(maxRetries = 30, delayMs = 4000) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await amqp.connect(RABBIT_URL);
      const channel = await conn.createChannel();
      console.log(`✅ Connected to RabbitMQ on attempt ${attempt}`);
      return { conn, channel };
    } catch (err) {
      console.warn(
        `⚠️  RabbitMQ not ready (attempt ${attempt}/${maxRetries}). Retrying in ${delayMs / 1000}s...`
      );
      await delay(delayMs);
    }
  }

  throw new Error(`❌ Could not connect to RabbitMQ after ${maxRetries} attempts.`);
}

module.exports = connectToRabbitMQ;

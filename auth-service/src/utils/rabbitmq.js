const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
    try {
        const url = process.env.RABBITMQ_URL || "amqp://localhost";
        const connection = await amqp.connect(url);
        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
    } catch (err) {
        console.error("RabbitMQ Connection Error:", err.message);
    }
};

const publishEvent = async (queue, data) => {
    if (!channel) await connectRabbitMQ();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
};

module.exports = { connectRabbitMQ, publishEvent };

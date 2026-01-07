const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

};

const publishEvent = async (queue,data) => {
    if(!channel) await connectRabbitMQ();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue,Buffer.from(JSON.stringigy(data)));

};

module.exports = {publishEvent};
const amqp = require("amqplib");
let channel;

const connectRabbitMQ = async () => {
    const conn = await conn.createChannel();

};

const consumeEvent = async(queue,cb) => {
    if(!channel) await connectRabbitMQ();
    await channel.assertQueue(queue);
    channel.consumeEvent = async(queue,cb) =>
    {
        if(!channel) await connectRabbitMQ();
        await channel.assertQueue(queue);
        channel.consume(queue,msg => {
            cb(JSON.parse(msg.content.toString()));
            channel.ack(msg);
        });
    };
};

module.exports = {consumerEvent};

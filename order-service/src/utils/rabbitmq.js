const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
  if (channel) return channel;

  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  console.log("Order Service connected to RabbitMQ");
  return channel;
};

const consumeEvent = async (queue, callback) => {
  const ch = await connectRabbitMQ();

  await ch.assertQueue(queue, { durable: true });

  ch.consume(queue, (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    callback(data);

    ch.ack(msg);
  });
};

module.exports = { consumeEvent };

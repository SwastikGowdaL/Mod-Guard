const amqp = require('amqplib');

require('dotenv').config();

let connection;
let channel;

//* establishing a connection to RabbitMQ server
//* then creating a channel using that connection
//* then creating new queue
const connect = async () => {
  connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  channel = await connection.createChannel();
  await channel.assertQueue('ModGuard');
};

//* receives the moderationData and enqueues that in the ModGuard queue
const moderationDataPublisher = async (moderationData) => {
  try {
    await channel.sendToQueue(
      'ModGuard',
      Buffer.from(JSON.stringify(moderationData))
    );
  } catch (err) {
    console.log(err);
  }
};

//* waiting for the connection to be established
const startPublisher = async () => {
  await connect();
};

startPublisher();

module.exports = {
  moderationDataPublisher,
};

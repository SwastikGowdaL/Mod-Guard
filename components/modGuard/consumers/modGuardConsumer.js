const amqp = require('amqplib');
const ShortUniqueId = require('short-unique-id');
const fs = require('fs');
const modGuardServices = require('../modGuardServices');
const imageModeration = require('../imageModeration');

require('dotenv').config();

let connection;
let channel;

const uid = new ShortUniqueId({ length: 10 });

//* establishing a connection to RabbitMQ server
//* then creating a channel using that connection
//* then creating new queue
const connect = async () => {
  connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  channel = await connection.createChannel();
  await channel.assertQueue('ModGuard');
};

//* consuming messages from modGuard queue
const moderationDataConsumer = async () => {
  channel.consume('ModGuard', async (message) => {
    const moderationData = JSON.parse(message.content.toString());
    if (message) {
      try {
        let response;

        //* checking whether the user provided image file
        if (
          Object.hasOwn(moderationData, 'image_file') &&
          !Object.hasOwn(moderationData, 'image_link')
        ) {
          //* creating a jpg file and writing the image buffer to it
          const filename = `${uid()}.jpg`;
          fs.writeFileSync(
            filename,
            Buffer.from(moderationData.image_file),
            'binary'
          );
          const imageModerationResponse =
            await imageModeration.extensiveImageModeration2(
              filename,
              moderationData.image_moderation
            );
          delete moderationData.image_file;
          response = await modGuardServices(moderationData, undefined);
          for (const key of Object.keys(imageModerationResponse)) {
            response[key] = imageModerationResponse[key];
          }

          //* deleting the jpg file
          fs.unlink(filename, (err) => {
            if (err) {
              console.log(err);
            }
            console.log(`successfully deleted ${filename}`);
          });
        } else {
          response = await modGuardServices(moderationData, undefined);
        }
        console.log(response);
        channel.ack(message);
      } catch (err) {
        console.log(err);
      }
    }
  });
};

//* waiting for the connection to be established
const startConsumer = async () => {
  await connect();
  await moderationDataConsumer();
};

startConsumer();

require('dotenv').config();

const amqp = require('amqplib');

(async () => {
  try {
    const { RABBIT_MQ_USERNAME, RABBIT_MQ_PASSWORD, RABBIT_MQ_HOST } = process.env;
    const connection = await amqp.connect(`amqp://${RABBIT_MQ_USERNAME}:${RABBIT_MQ_PASSWORD}@${RABBIT_MQ_HOST}`);
    const channel = await connection.createChannel();

    process.once('SIGINT', async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue('logging', { durable: false });
    await channel.consume(
      'logging',
      (message) => {
        if (message) {
          console.log(' [x] Received ', JSON.parse(message.content.toString()));
          // Save user update profile to log database in here
        }
      },
      { noAck: true }
    );

    console.log(' [*] Waiting for messages. To exit press CTRL+C');
  } catch (err) {
    console.warn(err);
  }
})();

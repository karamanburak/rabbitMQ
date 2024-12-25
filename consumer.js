const amqp = require("amqplib");

connect_to_rabbitmq();

async function connect_to_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = channel.assertQueue("jobsQueue");

    // Empfang der Nachrict...
    channel.consume("jobsQueue", (message) => {
      console.log("Message", message.content.toString());
    });
  } catch (error) {
    console.log("Error", error);
  }
}

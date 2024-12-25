const amqp = require("amqplib");

const queueName = process.argv[2] || "jobsQueue";
const data = require("./data.json");

connect_to_rabbitmq();

async function connect_to_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = channel.assertQueue(queueName);

    // Empfang der Nachrict...
    console.log("Nachricht erwartet...");

    channel.consume(queueName, (message) => {
      const messageInfo = JSON.parse(message.content.toString());
      const userInfo = data.find((u) => u.id == messageInfo.description);
      if (userInfo) {
        console.log("Nachricht empfangen", userInfo);
        channel.ack(message);
      }
    });
  } catch (error) {
    console.log("Error", error);
  }
}

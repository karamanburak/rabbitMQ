const amqp = require("amqplib");

const message = {
  description: "Das ist eine Testnachricht",
};

connect_to_rabbitmq();

async function connect_to_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = channel.assertQueue("jobsQueue");

    channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)));
    console.log("Nachricht gesendet", message);
  } catch (error) {
    console.log("Error", error);
  }
}

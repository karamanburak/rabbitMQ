const amqp = require("amqplib");

const message = {
  description: "Das ist eine Testnachricht",
};

const data = require("./data.json");
const queueName = process.argv[2] || "jobsQueue";
// console.log("queue", queueName);

connect_to_rabbitmq();

async function connect_to_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = channel.assertQueue(queueName);

    data.forEach((i) => {
      message.description = i.id;
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      console.log("Nachricht gesendet", i.id);
    });

    // ================================== Interval ==========================
    // setInterval(() => {
    //     message.description = new Date().getTime();
    //     channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    //     console.log("Nachricht gesendet", message);
    // }, 10);
    // ================================== Interval ==========================
  } catch (error) {
    console.log("Error", error);
  }
}

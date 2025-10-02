import { Kafka, type Message } from "kafkajs";
import kafka from "../config/kafka.js";

const createProducer = async (topic: string, messages: Message[]) => {
    const producer = kafka.producer();
    console.log(`[Producer] Connecting to Kafka...`);
    await producer.connect();
    console.log(`[Producer] Connected. Sending messages to topic "${topic}"...`);
    await producer.send({
        topic: topic,
        messages: messages
    });
    console.log(`[Producer] Messages sent to topic "${topic}". Disconnecting producer...`);
    await producer.disconnect();
    console.log(`[Producer] Disconnected from Kafka.`);
};

export default createProducer;

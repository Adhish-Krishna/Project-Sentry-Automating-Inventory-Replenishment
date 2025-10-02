import { Kafka} from "kafkajs";
import dotenv from 'dotenv';

dotenv.config();

const KAFKA_URI = process.env.KAFKA_URI || 'localhost:9092'
const kafka = new Kafka({
    clientId: "scm",
    brokers: [KAFKA_URI],
    retry: {
        initialRetryTime: 300,
        retries: 10
    },
    connectionTimeout: 30000,
    requestTimeout: 30000
});

export default kafka;
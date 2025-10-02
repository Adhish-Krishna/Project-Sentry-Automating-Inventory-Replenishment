import { Kafka} from "kafkajs";

const kafka = new Kafka({
    clientId: "scm",
    brokers: ["localhost:9092"]
});

export default kafka;
import { Kafka} from "kafkajs";

const kafka = new Kafka({
    clientId: "scm",
    brokers: ["kafka1:9092"]
});

export default kafka;
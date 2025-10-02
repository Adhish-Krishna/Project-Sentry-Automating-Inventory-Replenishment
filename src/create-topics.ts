import { createTopics } from './config/topics.js';

console.log('Creating Kafka topics...');

createTopics()
    .then(() => {
        console.log('Topics created successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Failed to create topics:', error);
        process.exit(1);
    });
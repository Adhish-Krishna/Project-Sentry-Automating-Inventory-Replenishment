import kafka from '../config/kafka.js';
import { Topics } from '../types/types.js';

export const createTopics = async () => {
    try {
        const admin = kafka.admin();
        await admin.connect();
        console.log('[Kafka Admin] Connected to Kafka');

        // Get list of existing topics
        const existingTopics = await admin.listTopics();
        console.log('[Kafka Admin] Existing topics:', existingTopics);

        // Define topics to create
        const topicsToCreate = [
            {
                topic: Topics.api2, // transfer_order
                numPartitions: 1,
                replicationFactor: 1,
            },
            {
                topic: Topics.api3, // shipment
                numPartitions: 1,
                replicationFactor: 1,
            },
            {
                topic: Topics.api4, // delivery
                numPartitions: 1,
                replicationFactor: 1,
            }
        ];

        // Filter out topics that already exist
        const newTopics = topicsToCreate.filter(
            topicConfig => !existingTopics.includes(topicConfig.topic)
        );

        if (newTopics.length > 0) {
            console.log('[Kafka Admin] Creating topics:', newTopics.map(t => t.topic));
            await admin.createTopics({
                topics: newTopics,
                waitForLeaders: true,
                timeout: 30000
            });
            console.log('[Kafka Admin] Topics created successfully!');
        } else {
            console.log('[Kafka Admin] All topics already exist');
        }

        await admin.disconnect();
        console.log('[Kafka Admin] Disconnected from Kafka');

    } catch (error) {
        console.error('[Kafka Admin] Error creating topics:', error);
        throw error;
    }
};
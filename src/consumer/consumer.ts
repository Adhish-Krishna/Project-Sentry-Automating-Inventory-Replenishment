import kafka from "../config/kafka.js";

const createConsumer = async (topic: string, api_url: string) => {
    try {
        const consumer = kafka.consumer({ 
            groupId: `${topic}-consumer-group`,
            sessionTimeout: 30000,
            heartbeatInterval: 3000
        });
        await consumer.connect();
        console.log(`[Consumer] Consumer connected for topic: ${topic}`);
        
        let retries = 3;
        while (retries > 0) {
            try {
                await consumer.subscribe({ 
                    topic: topic,
                    fromBeginning: false 
                });
                console.log(`[Consumer] Subscribed to topic: ${topic}`);
                break;
            } catch (error) {
                retries--;
                if (retries === 0) throw error;
                console.log(`[Consumer] Retrying subscription to topic: ${topic} (${retries} retries left)`);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const messageValue = message.value?.toString();
                    
                    if (!messageValue) {
                        console.log(`[Consumer] Empty message received from topic: ${topic}`);
                        return;
                    }
                    console.log(`[Consumer] Received message from topic: ${topic}, partition: ${partition}`);
                    console.log(`[Consumer] Message value: ${messageValue}`);
                    const jsonBody = JSON.parse(messageValue);
                    const response = await fetch(api_url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(jsonBody)
                    });
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log(`[Consumer] Successfully sent request to ${api_url}`);
                        console.log(`[Consumer] Response:`, responseData);
                    } else {
                        console.error(`[Consumer] Failed to send request to ${api_url}. Status: ${response.status}`);
                        const errorText = await response.text();
                        console.error(`[Consumer] Error response: ${errorText}`);
                    }

                } catch (error) {
                    console.error(`[Consumer] Error processing message from topic ${topic}:`, error);
                }
            },
        });
        const shutdown = async () => {
            console.log(`[Consumer] Shutting down consumer for topic: ${topic}`);
            await consumer.disconnect();
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
        return consumer;
    } catch (error) {
        console.error(`[Consumer] Error creating consumer for topic ${topic}:`, error);
        throw error;
    }
};

export default createConsumer;

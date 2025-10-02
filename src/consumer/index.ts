import createConsumer from './consumer.js';
import { Topics } from '../types/types.js';
import { createTopics } from '../config/topics.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = `http://localhost:${process.env.PORT}`;

export const initializeConsumers = async () => {
    try {
        console.log('[Consumers] Initializing all consumers...');
        
        await createTopics();
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await createConsumer(Topics.api2, `${BASE_URL}/api/replenishment/createorder`);
        
        await createConsumer(Topics.api3, `${BASE_URL}/api/replenishment/ship`);
        
        await createConsumer(Topics.api4, `${BASE_URL}/api/replenishment/confirm`);
        
        console.log('[Consumers] All consumers initialized successfully!');
    } catch (error) {
        console.error('[Consumers] Error initializing consumers:', error);
        throw error;
    }
};
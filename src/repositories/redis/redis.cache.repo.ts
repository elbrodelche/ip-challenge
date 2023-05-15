import { ICacheRepo } from './cache.repo';
import * as dotenv from 'dotenv';
import { createClient, RedisClientType } from 'redis';
import { RetrievedIPData } from '../../models/ip';

dotenv.config();

export class RedisCacheRepo implements ICacheRepo {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
        });
        this.client.on('error', (err: any) => console.log('Redis Client Error', err));
    }

    async connect() {
        await this.client.connect();
    }

    async set(key: string, value: RetrievedIPData): Promise<void> {
        await this.client.set(`max_hits`, JSON.stringify({ ...value, hits: 0 }));
        await this.client.set(key, JSON.stringify(value));
    }

    async get<T>(key: string): Promise<RetrievedIPData> {
        const value = await this.client.get(key);

        await this.increase(`${key}_cache_hits`);
        const values = JSON.parse(value);
        const hits = await this.client.get(`${key}_cache_hits`);
        const maxHits = await this.client.get(`max_hits`);
        const maxHitsValue = JSON.parse(maxHits);

        // Most traced IP
        if (parseInt(hits) > parseInt(maxHitsValue?.hits || '0')) {
            await this.client.set(`max_hits`, JSON.stringify({ ...values, hits: Number(hits) }));
        }
        // Longest distance
        const maxDistance = await this.client.get(`${key}_max_distance`);
        if (+values?.distance_to_usa > +maxDistance) {
            await this.client.set(
                `max_distance`,
                JSON.stringify({ ...values, distance_to_usa: Number(values?.distance_to_usa) }),
            );
        }

        // Return value
        return value ? JSON.parse(value) : null;
    }

    async disconnect() {
        await this.client.disconnect();
    }

    async increase(key: string): Promise<void> {
        await this.client.incr(key);
    }

    async getMaxHits<T>(): Promise<RetrievedIPData> {
        const maxHits = await this.client.get(`max_hits`);
        return maxHits ? JSON.parse(maxHits) : null;
    }

    async getMaxDistance<T>(): Promise<RetrievedIPData> {
        const maxDistance = await this.client.get(`max_distance`);
        return maxDistance ? JSON.parse(maxDistance) : null;
    }
}

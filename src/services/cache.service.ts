import { ICacheRepo } from '../repositories/redis/cache.repo';
import { RedisCacheRepo } from '../repositories/redis/redis.cache.repo';
import { RetrievedIPData } from '../models/ip';

export class CacheService implements ICacheRepo {
    private cacheRepo: RedisCacheRepo;

    constructor(cacheRepo: RedisCacheRepo) {
        this.cacheRepo = cacheRepo;
    }

    async connect(): Promise<void> {
        return await this.cacheRepo.connect();
    }

    async disconnect(): Promise<void> {
        return await this.cacheRepo.disconnect();
    }

    async set(key: string, value: RetrievedIPData): Promise<void> {
        await this.connect();
        await this.cacheRepo.set(key, value);
        await this.disconnect();
    }

    async get<T>(key: string): Promise<RetrievedIPData> {
        await this.connect();
        const value = await this.cacheRepo.get(key);
        await this.disconnect();
        return value;
    }

    async increase(key: string): Promise<void> {
        await this.connect();
        await this.cacheRepo.increase(key);
        await this.disconnect();
    }

    async getMaxHits<T>(): Promise<RetrievedIPData> {
        await this.connect();
        const value = await this.cacheRepo.getMaxHits();
        await this.disconnect();
        return value;
    }

    async getMaxDistance<T>(): Promise<RetrievedIPData> {
        await this.connect();
        const value = await this.cacheRepo.getMaxDistance();
        await this.disconnect();
        return value;
    }
}

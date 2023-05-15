import { RetrievedIPData } from '../../models/ip';

export interface ICacheRepo {
    get<T>(key: string): Promise<RetrievedIPData>;
    set(key: string, value: RetrievedIPData): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    increase(key: string): Promise<void>;
    getMaxHits<T>(): Promise<RetrievedIPData>;
    getMaxDistance<T>(): Promise<RetrievedIPData>;
}

import { RetrievedIPData } from '../../models/ip';

export interface ILocationRepo {
    getIPData(id: string): Promise<RetrievedIPData>;
}

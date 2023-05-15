import { Currency, RetrievedIPData } from '../../models/ip';

export interface IFixerRepo {
    getLatestCurrency(countryCode: string): Promise<any>;
}

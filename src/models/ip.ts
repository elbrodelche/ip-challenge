export class RetrievedIPData {
    'ip': string;
    'name': string;
    'code': string;
    'lat': number;
    'lon': number;
    'distance_to_usa': number;
    currencies: Currency[];
    'hits': number;
}

export interface Currency {
    iso: string;
    symbol: string;
    conversion_rate: number;
}

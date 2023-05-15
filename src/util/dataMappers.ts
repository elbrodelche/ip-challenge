import { RetrievedIPData } from '../models/ip';

export const getIPInfo = (info: any) =>
    <RetrievedIPData>{
        ip: info.query,
        name: info.country,
        code: info.countryCode,
        lat: info.lat,
        lon: info.lon,
    };

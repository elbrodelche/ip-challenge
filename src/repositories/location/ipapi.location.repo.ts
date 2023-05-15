import { ILocationRepo } from './location.repo';
import { RetrievedIPData } from '../../models/ip';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import { getIPInfo } from '../../util/dataMappers';

dotenv.config();

export class IpApiLocationRepo implements ILocationRepo {
    private readonly appUrl: string;

    constructor() {
        this.appUrl = process.env.IPAPI_URL;
    }

    async getIPData(ip: string): Promise<RetrievedIPData> {
        try {
            const url = `${this.appUrl}/json/${ip}`;
            const response = await fetch(url);
            const data = await response.json();
            return getIPInfo(data);
        } catch (e) {
            new Error(`Couldn't retrieve IP data: ${e.message}`);
        }
    }
}

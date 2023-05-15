import { IFixerRepo } from './fixer.repo';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { Currency, RetrievedIPData } from '../../models/ip';
import { getCountryISO3 } from '../../util/helpers';

dotenv.config();

export class ApilayerFixerRepo implements IFixerRepo {
    private readonly appUrl: string;
    private readonly appKey: string;

    constructor() {
        this.appUrl = process.env.FIXER_URL;
        this.appKey = process.env.FIXER_KEY;
    }

    async getLatestCurrency(countryCode: string): Promise<Array<Currency>> {
        try {
            const code = getCountryISO3(countryCode);
            const options = { method: 'GET', headers: { apikey: this.appKey } };
            const response = await fetch(`https://api.apilayer.com/fixer/latest?symbols=${code},USD&base=USD`, options);
            const jsonResponse = await response.json();
            console.log({ jsonResponse });
            const arsConversionRate = jsonResponse.rates.ARS;
            const usdConversionRate = jsonResponse.rates.USD;
            const currencyData = [
                {
                    iso: code,
                    symbol: '$',
                    conversion_rate: arsConversionRate,
                },
                {
                    iso: 'USD',
                    symbol: '$',
                    conversion_rate: usdConversionRate,
                },
            ];
            return currencyData;
        } catch (e) {
            new Error(`Couldn't retrieve currency data: ${e.message}`);
        }
    }
}

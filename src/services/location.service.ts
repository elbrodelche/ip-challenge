import { ILocationRepo } from '../repositories/location/location.repo';
import { IFixerRepo } from '../repositories/apilayer/fixer.repo';
import { RetrievedIPData } from '../models/ip';
import { calculateDistance } from '../util/helpers';

export class LocationService {
    private locationRepo: ILocationRepo;
    private fixerRepo: IFixerRepo;

    constructor(locationRepo: ILocationRepo, fixerRepo: IFixerRepo) {
        this.locationRepo = locationRepo;
        this.fixerRepo = fixerRepo;
    }

    async getIPData(ip: string): Promise<RetrievedIPData> {
        const ipData = await this.locationRepo.getIPData(ip);
        const currencies = await this.fixerRepo.getLatestCurrency(ipData.code);
        const distanceToUSA = calculateDistance(ipData.lat, ipData.lon, 37.0902, -95.7129);

        return {
            ...ipData,
            distance_to_usa: distanceToUSA,
            currencies,
        };
    }
}

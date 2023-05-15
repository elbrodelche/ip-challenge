import { LocationService } from '../location.service';
import { IpApiLocationRepo } from '../../repositories/location/ipapi.location.repo';
import { ApilayerFixerRepo } from '../../repositories/apilayer/apilayer.fixer.repo';

test('Location service returns ip data object', async () => {
    const service = new LocationService(new IpApiLocationRepo(), new ApilayerFixerRepo());
    const location = await service.getIPData('4.4.4.4');
    expect(location).toEqual(expect.any(Object));
});

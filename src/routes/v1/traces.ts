import * as Router from 'koa-router';
import { ParameterizedContext } from 'koa';
import { LocationService } from '../../services/location.service';
import { CacheService } from '../../services/cache.service';
import { IpApiLocationRepo } from '../../repositories/location/ipapi.location.repo';
import { ApilayerFixerRepo } from '../../repositories/apilayer/apilayer.fixer.repo';
import { RedisCacheRepo } from '../../repositories/redis/redis.cache.repo';
import { RetrievedIPData } from '../../models/ip';

const router = new Router();
const locationService = new LocationService(new IpApiLocationRepo(), new ApilayerFixerRepo());
const cacheService = new CacheService(new RedisCacheRepo());
const tracesRouter = router

    /**
     * @api {post} /traces IP information
     * @apiVersion 1.0.0
     * @apiName GetTraces
     * @apiGroup Main
     *
     * @apiDescription Get the information associated with that IP address.
     *
     * @apiExample Example usage:
     * curl --request POST \
     *   --url http://localhost:3000/v1/traces \
     *   --header 'Content-Type: application/json' \
     *   --data ' {
     * 	 "ip":"167.62.158.169"
     *  }'
     *
     * @apiBody {String} ip Given IP address
     * @apiSuccess {String}   ip                    IP address
     * @apiSuccess {String}   name                  Country name
     * @apiSuccess {String}   code                  Country code
     * @apiSuccess {Number}   lat                   Latitude
     * @apiSuccess {Number}   lon                   Longitude
     * @apiSuccess {Object}   currencies            Country currency
     * @apiSuccess {Number}   distance_to_usa       Distance to USA
     *
     * @apiError  BadRequest Can't reach IP information.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400  Bad Request
     *     Can't reach IP information
     */
    .post('/', async (ctx: ParameterizedContext, next) => {
        // Get data
        const { ip } = ctx.request.body;

        const cachedData: RetrievedIPData = await cacheService.get(ip);
        if (cachedData) {
            ctx.status = 200;

            ctx.body = {
                ...cachedData,
            };
            await next();
            return;
        }

        const ipData = await locationService.getIPData(ip);
        await cacheService.set(ip, ipData);

        // Error handling
        ctx.assert(ipData, 400);

        // Response
        ctx.status = 200;
        ctx.body = {
            ...ipData,
        };

        await next();
    });

export default tracesRouter;

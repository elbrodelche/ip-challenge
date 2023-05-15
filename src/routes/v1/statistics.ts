import * as Router from 'koa-router';
import { CacheService } from '../../services/cache.service';
import { RedisCacheRepo } from '../../repositories/redis/redis.cache.repo';

const router = new Router();
const cacheService = new CacheService(new RedisCacheRepo());
const forecastRouter = router

    /**
     * @api {get} /statistics IP statistics
     * @apiVersion 1.0.0
     * @apiName GetStatistics
     * @apiGroup Main
     *
     * @apiDescription Retrieves largest distance from requested traces and most traced country.
     *
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/statistics
     *
     * @apiError  BadRequest Can't reach statistics.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400  Bad Request
     *     Can't reach statistics
     */
    .get('/', async (ctx, next) => {
        // Get data
        const maxDistance = await cacheService.getMaxDistance();
        const maxHits = await cacheService.getMaxHits();

        ctx.status = 200;
        ctx.body = {
            longest_distance: {
                country: maxDistance.name,
                value: maxDistance.distance_to_usa,
            },
            most_traced: {
                country: maxHits.name,
                value: maxHits.hits,
            },
        };
        await next();
    });

export default forecastRouter;

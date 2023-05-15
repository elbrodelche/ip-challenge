import * as Router from 'koa-router';
import tracesRouter from './v1/traces';
import statisticsRouter from './v1/statistics';

const version = '/v1';
const router = new Router();
router.prefix(version);

const V1Router = router
    // Index
    .get('/ping', async (ctx) => {
        ctx.body = `
            Pong. 
            
            Up and running. 
            Port: ${process.env.NODE_PORT}
            Env:  ${process.env.NODE_ENV}
            `;
    })

    // Traces
    .use(`/traces`, tracesRouter.routes(), tracesRouter.allowedMethods())

    // Statistics
    .use(`/statistics`, statisticsRouter.routes(), statisticsRouter.allowedMethods());

export default V1Router;

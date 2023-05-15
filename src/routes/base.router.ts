import * as Router from 'koa-router';

const router = new Router();

const BaseRouter = router
    /**
     * @api {get} /ping Check for sever health
     * @apiVersion 1.0.0
     * @apiName GetPing
     * @apiGroup Server
     *
     * @apiDescription Standard health check on server.
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/ping
     *
     * @apiSuccess {String}   text            Pong text and some server status.
     */
    .get('/ping', async (ctx) => {
        ctx.body = `
            Pong. 
            
            Up and running. 
            Port: ${process.env.NODE_PORT}
            Env:  ${process.env.NODE_ENV}
            `;
    });

export default BaseRouter;

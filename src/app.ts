import * as dotenv from 'dotenv';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as serve from 'koa-static';
import { koaBody } from 'koa-body';

import V1Router from './routes/v1.router';
import BaseRouter from './routes/base.router';

// Koa instances
const app = new Koa();
const router = new Router();

// Middleware
dotenv.config();
app.use(logger());
app.use(koaBody());

// Router
app.use(router.routes());
app.use(BaseRouter.routes());
app.use(V1Router.routes());
app.use(serve('./public'));

export default app;

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

const employeeRouterMiddleware = require('./router/middleware/employeeRouterMiddleware');

router.use('/emp',employeeRouterMiddleware);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3009);
const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

const employeeRouterMiddleware = require('./router/middleware/employeeRouterMiddleware');
const leaveRouterMiddleware = require('./router/middleware/leaveRoutermiddleware');
const departmentRouterMiddleware = require('./router/middleware/departmentRouterMiddleware');
const attendanceRouterMiddleware = require('./router/middleware/attendanceRouterMiddleware');

app.use(bodyparser());

app.use(async (ctx,next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  await next();
});

router.use('/emp', employeeRouterMiddleware);
router.use('/leave', leaveRouterMiddleware);
router.use('/department', departmentRouterMiddleware);
router.use('/attendance', attendanceRouterMiddleware);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3009);
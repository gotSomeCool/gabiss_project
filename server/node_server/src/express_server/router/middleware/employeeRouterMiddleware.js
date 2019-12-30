const Router = require('koa-router');
const router = new Router();

const {getAllEmployee,addNewEmployee} = require('../databaseConnection/employee');
router.get('/getAll',async (ctx, next) => {
  await getAllEmployee().then(data => {
    ctx.body = JSON.stringify(data.recordset);
    next();
  });
});

router.get('/addNew',async (ctx, next) => {
  const {
    gender,
    name,
    departmentId
  } = ctx.request.query;
  await addNewEmployee(gender,name,departmentId).then(result => {
    ctx.body = 'add success';
    next();
  });
});

module.exports = router.routes();
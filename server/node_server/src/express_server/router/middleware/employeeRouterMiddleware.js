const Router = require('koa-router');
const router = new Router();

const {getAllEmployee, addNewEmployee, removeEmployee} = require('../databaseConnection/employee');

router.get('/getAll',async (ctx, next) => {
  await getAllEmployee().then(data => {
    ctx.body = JSON.stringify(data.recordset);
    next();
  });
});

router.get('/addNew', async (ctx, next) => {
  const {
    gender,
    name,
    departmentId
  } = ctx.request.query;
  await addNewEmployee(gender,name,departmentId).then(result => {
    ctx.body = 'add success';
    next();
  }).catch(err => {
    ctx.body = {
      error: JSON.stringify(err),
      code: 500
    };
    next();
  });
});

router.get('/remove', async (ctx, next) => {
  const {
    id
  } = ctx.request.query;
  await removeEmployee(id).then(result => {
    ctx.body = 'remove success';
    next();
  }).catch(err => {
    ctx.body = {
      error:JSON.stringify(err),
      code:500
    };
    next();
  });
});

module.exports = router.routes();
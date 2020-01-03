const Router = require('koa-router');
const router = new Router();

const {getAllDepartment, addNewDepartment, removeDepartment} = require('../databaseConnection/department');

router.get('/getAll', async (ctx, next) => {
  await getAllDepartment().then(data => {
    ctx.body = JSON.stringify(data.recordset);
    next();
  });
});

router.get('/addNew', async (ctx, next) => {
  const {
    Name,
    WorkingHoursAM,
    WorkingHoursPM
  } = ctx.request.query;
  await addNewDepartment(Name,WorkingHoursAM,WorkingHoursPM).then(result => {
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
  await removeDepartment(id).then(result => {
    ctx.body = 'remove success';
    next();
  }).catch(err => {
    ctx.body = {
      error: JSON.stringify(err),
      code: 500
    };
    next();
  });
})


module.exports = router.routes();
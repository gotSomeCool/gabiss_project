const Router = require('koa-router');
const router = new Router();

const {getAllLeaves,addNewLeave} = require('../databaseConnection/leave');

router.get('/getAll', async (ctx, next) => {
  await getAllLeaves().then(data => {
    ctx.body = JSON.stringify(data.recordset);
    next();
  });
});

router.get('/addNew', async (ctx, next) => {
  const {
    DepartmentId,
    Reason,
    StartDate, 
    EndDate
  } = ctx.request.query;
  await addNewLeave(DepartmentId, Reason, StartDate, EndDate).then(data => {
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



module.exports = router.routes();
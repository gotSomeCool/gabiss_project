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
    EmployeeId,
    EmployeeName,
    DepartmentId,
    DepartmentName,
    Reason,
    StartDate, 
    EndDate,
    State
  } = ctx.request.query;
  await addNewLeave(EmployeeId,
    EmployeeName,
    DepartmentId,
    DepartmentName,
    Reason,
    StartDate, 
    EndDate,
    State).then(data => {
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
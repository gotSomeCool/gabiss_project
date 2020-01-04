const Router = require('koa-router');
const router = new Router();

const {getAllAttendance,addNewAttendance} = require('../databaseConnection/attendance');

router.get('/getAll', async (ctx, next) => {
  await getAllAttendance().then(data => {
    ctx.body = JSON.stringify(data.recordset);
    next();
  });
});

router.get('/addNew', async (ctx, next) => {
  const {
    EmployeeId,
    EmployeeName,
    DepartmentId,
    AttendDate,
    State
  } = ctx.request.query;
  await addNewAttendance(EmployeeId,
    EmployeeName,
    DepartmentId,
    AttendDate,
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
const Router = require('koa-router');
const router = new Router();

const {getAllAttendance,addNewAttendance} = require('../databaseConnection/attendance');

router.get('/getAllLeave', async (ctx, next) => {
  await getAllAttendance().then(data => {
    ctx.body = JSON.stringify(data.recordset);
    next();
  });
});

router.get('/addNew', async (ctx, next) => {
  const {
    EmployeeID,
    NotAttendanceDate
  } = ctx.request.query;
  await addNewAttendance(EmployeeID, NotAttendanceDate).then(data => {
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
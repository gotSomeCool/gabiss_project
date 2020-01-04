const getConnectionPool = require('../../../database/getDB');
const poolConnect = getConnectionPool();

function getAllAttendance(){
  return new Promise((resolve, reject) => {
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`select * from attendance`).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  });
}
function addNewAttendance(EmployeeId,
  EmployeeName,
  DepartmentId,
  AttendDate,
  State){
  return new Promise((resolve, reject) => {
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`insert into attendance (EmployeeId,EmployeeName,DepartmentId,AttendDate,State) values ('${EmployeeId}','${EmployeeName}','${DepartmentId}','${AttendDate}','${State}')`)
        .then(result=>{
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  });
}

module.exports = {getAllAttendance, addNewAttendance};
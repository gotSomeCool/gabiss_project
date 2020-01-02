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
function addNewAttendance(EmployeeID,NotAttendanceDate){
  return new Promise((resolve, reject) => {
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`insert into attendance (EmployeeID,NotAttendanceDate) values ('${EmployeeID}','${NotAttendanceDate}')`)
        .then(result=>{
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  });
}

module.exports = {getAllAttendance, addNewAttendance};
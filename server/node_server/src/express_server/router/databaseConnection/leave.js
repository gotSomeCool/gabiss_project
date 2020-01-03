const getConnectionPool = require('../../../database/getDB');
const poolConnect = getConnectionPool();

function getAllLeaves(){
  return new Promise((resolve, reject) => {
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`select * from leave`).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  })
}

function addNewLeave(EmployeeId,
  EmployeeName,
  DepartmentId,
  DepartmentName,
  Reason,
  StartDate, 
  EndDate,
  State){
  return new Promise((resolve, reject) => {
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`insert into leave (EmployeeId,EmployeeName,DepartmentId,DepartmentName,Reason,StartDate,EndDate,State) values ('${EmployeeId}','${EmployeeName}','${DepartmentId}','${DepartmentName}','${Reason}','${StartDate}','${EndDate}','${State}')`)
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    })
  })
}

module.exports = {getAllLeaves, addNewLeave};
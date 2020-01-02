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

function addNewLeave(DepartmentId, Reason, StartDate, EndDate){
  return new Promise((resolve, reject) => {
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`insert into leave (DepartmentId,Reason,StartDate,EndDate) values ('${DepartmentId}','${Reason}','${StartDate}','${EndDate}')`)
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    })
  })
}

module.exports = {getAllLeaves, addNewLeave};
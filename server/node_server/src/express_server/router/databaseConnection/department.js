const getConnectionPool = require('../../../database/getDB');
const poolConnect = getConnectionPool();

function getAllDepartment() {
  return new Promise((resolve,reject) => {
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`select * from department`).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  });
}

function addNewDepartment(Name, WorkingHoursAM, WorkingHoursPM) {
  return new Promise((resolve, reject) => {
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`insert into department (Name, WorkingHoursAM, WorkingHoursPM) values ('${Name}','${WorkingHoursAM}','${WorkingHoursPM}')`)
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  });
}

module.exports = {getAllDepartment, addNewDepartment};
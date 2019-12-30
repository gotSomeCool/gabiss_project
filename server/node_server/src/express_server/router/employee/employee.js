const getConnectionPool = require('../../database/getDB');
const poolConnect = getConnectionPool();


function getAllEmployee () {
  return new Promise ((resolve,reject)=>{
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`select * from employee`).then(result => {
        resolve(result);
        pool.close();
      }).catch(err => {
        reject(err);
        pool.close();
      })
    })
  })
}

function addNewEmployee(gender,name,department){
  return new Promise ((resolve,reject)=>{
    poolConnect.then(pool=>{
      const request = pool.request();
      request.query(`insert into employee (Gender,Name,DepartmentId) values ('${gender}','${name}','${department}')`).then(result => {
        resolve(result);
        pool.close();
      }).catch(err => {
        reject(err);
        pool.close();
      })
    })
  })
}

module.exports = {getAllEmployee, addNewEmployee};
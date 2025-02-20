const getConnectionPool = require('../../../database/getDB');
const poolConnect = getConnectionPool();


function getAllEmployee () {
  return new Promise ((resolve,reject)=>{
    poolConnect.then(pool => {
      const request = pool.request();
      request.query(`select * from employee`).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    })
  })
}

function addNewEmployee(gender,name,department){
  return new Promise ((resolve,reject)=>{
    poolConnect.then(pool=>{
      const request = pool.request();
      request.query(`insert into employee (Gender,Name,DepartmentId) values ('${gender}','${name}','${department}')`).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    })
  })
}

function removeEmployee(id){
  return new Promise((resolve, reject) => {
    poolConnect.then(pool => {
      const request = pool.request();
      id = Number.isInteger(id) ? id : Number(id); 
      request.query(`delete from employee where Id=${id}`).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    })
  })
}

module.exports = {getAllEmployee, addNewEmployee, removeEmployee};
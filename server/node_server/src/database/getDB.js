const sql = require('mssql');

const config = {
  user: 'SA',
  password: '<A12345678@Passw0rd>', 
  server:'106.14.224.131',
  database:'gabiss_db'
}

// const pool = new sql.ConnectionPool(config);
// const poolConnect = pool.connect();
// console.log(poolConnect);
// pool.on('error',(err)=>{
//   console.log(err);
// })

// poolConnect.then(pool => {
//   const request = pool.request();
//   request.query('select * from employee').then(result => {
//     console.log(result);
//     pool.close();
//   }).catch(err => {

//   })
// })

function getConnectionPool(){
  const pool = new sql.ConnectionPool(config);
  const poolConnect = pool.connect();
  return poolConnect;
}
module.exports = getConnectionPool;
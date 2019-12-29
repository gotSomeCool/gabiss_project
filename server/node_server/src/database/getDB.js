const sql = require('mssql');

async function getDB() {
  const config = {
    user: 'SA',
    password: '<A12345678@Passw0rd>',
    server:'106.14.224.131',
    database:'gabiss_db'
  }
  let databaseConnectionPool = null;
  new sql.ConnectionPool(config).connect().then(pool => {
    databaseConnectionPool = pool;
  }).catch(err => {
    // console.log(err);
  });
  return databaseConnectionPool;
}
module.export = getDB();

const sql = require('mssql');

const config = {
  user: 'SA',
  password: '<A12345678@Passw0rd>', 
  server:'106.14.224.131',
  database:'ljw_db'
}

function getConnectionPool(){
  const pool = new sql.ConnectionPool(config);
  const poolConnect = pool.connect();
  return poolConnect;
}
module.exports = getConnectionPool;
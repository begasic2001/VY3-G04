const sql = require('mssql/msnodesqlv8');

const config = {
    server:`localhost\\MINHTHANH`,
    user:"sa",
    password:"123456",
    database:"airport_tranfer",
    driver:"msnodesqlv8"

}

const conn = new sql.ConnectionPool(config).connect()
    .then(pool =>{ 
        console.log("kết nối thành công")
         return pool;
    })

module.exports = {
    conn : conn,
    sql: sql
}
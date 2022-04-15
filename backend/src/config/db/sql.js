const sql = require('mssql/msnodesqlv8');

const config = {
<<<<<<< HEAD
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
=======
	server: `localhost\\G24`,
	user: 'sa',
	password: 'Hung2001',
	database: 'airport_tranfer',
	driver: 'msnodesqlv8',
};

const conn = new sql.ConnectionPool(config).connect().then((pool) => {
	console.log('kết nối thành công');
	return pool;
});

module.exports = {
	conn: conn,
	sql: sql,
};
>>>>>>> a06811a (Upload V2)

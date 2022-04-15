const { conn, sql } = require('../../config/db/sql');
const {querysTypeCar} = require('../../config/db/sql_query');
class TypeCarsController {
   
    getAllType = async (req, res) => {
      
        try{
            let pool = await conn;
            let sqlString = querysTypeCar.getAllType;
            return await pool.request().query(sqlString, (err, data) => {
                if(!err){
                    res.json({result: data.recordset});
                }else{
                    res.json({message: "Không có dữ liệu", error: err.message});
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    

}

module.exports = new TypeCarsController();
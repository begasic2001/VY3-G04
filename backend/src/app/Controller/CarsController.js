const { conn, sql } = require('../../config/db/sql');
const {querysCar} = require('../../config/db/sql_query');
class CarsController {
    
    getAllCar = async (req, res) => {
        try{
            let pool = await conn;
            let sqlString = querysCar.getAllCar;
            return await pool.request()
            .query(sqlString, (err, data) => {
                if(!err){ 
                    res.json({ data: data.recordset});
                }else{
                    res.json({ message: "Không load danh sách xe", error: err.message});
                }
            });
        }catch (err) {  
            console.log(err);
        }
    }

    
    show = async (req, res) => {
        try{
            let id = req.params.id;
            let pool =  await conn;
            let sqlString = querysCar.getCarById;
            return await pool.request()
            .input('ma_xe', sql.NVarChar, id)
            .query(sqlString, (err, data) => {
                if(!err){
                    res.json({ result: data.recordset[0]});
                }else{
                    res.json({ message: "Không tồn tại", 
                            error: err.message
                        });
                }
            })
        }catch (err) {
            console.log(err);
        }
    }

   
    createCar = async (req, res) => {
        try{
            let pool = await conn;
            let sqlString = querysCar.createCar;
            return await pool.request()
            .input('ma_xe', sql.NVarChar, req.body.ma_xe)
            .input('so_xe', sql.NVarChar, req.body.so_xe)
            .input('ma_loai', sql.Int, req.body.ma_loai)
            .input('hang_xe', sql.NVarChar, req.body.hang_xe)
            .input('ma_cong_ty', sql.Int, req.body.ma_cong_ty)
            .input('so_ghe', sql.Int, req.body.so_ghe)
            .query(sqlString, (err, data) => {
                if(!err) {
                    res.json({message: "Thêm thông tin thành công", data: data});
                }else{
                    res.json({message: "Thêm thông tin thất bại", error: err.message});
                }
            });
        }catch (err) {
            console.log(err);
        }
    }

    
    updateCar = async (req, res) => {
        try{
            let id = req.params.id;
            let pool = await conn;
            let sqlString = querysCar.updateCar;
            return await pool.request()
            .input('ma_xe', sql.NVarChar, id)
            .input('so_xe', sql.NVarChar, req.body.so_xe)
            .input('ma_loai', sql.Int, req.body.ma_loai)
            .input('hang_xe', sql.NVarChar, req.body.hang_xe)
            .input('ma_cong_ty', sql.Int, req.body.ma_cong_ty)
            .input('so_ghe', sql.Int, req.body.so_ghe)
            .query(sqlString, (err, data) => {
                if(!err){
                    res.json({message: "Cập nhật thông tin thành công", data: data});
                }else{
                    res.json({message: "Cập nhật thông tin thất bại", error: err.message});
                }
            })
        }catch (err) {
            console.log(err);
        }
    }

    
    deleteCar = async (req, res) => {
        try{
            let id = req.params.id;
            let pool = await conn;
            let sqlString = querysCar.deleteCar;
            return await pool.request()
            .input('ma_xe', sql.NVarChar, id)
            .query(sqlString, (err, data) => {
                if(!err){
                    res.json({message: "Xoá thông tin thành công", data: data});
                }else{
                    res.json({message: "Xoá thông tin thất bại"})
                }
            })
        }catch (err) {
            console.log(err);
        }
    }

}

module.exports = new CarsController();
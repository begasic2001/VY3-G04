const { conn, sql } = require("../../config/db/sql");
const { querysDriver } = require("../../config/db/sql_query");
class DriverController {
  getAllDriver = async (req, res) => {
    try {
      let pool = await conn;
      let sqlString = querysDriver.getAllDriver;
      return await pool.request().query(sqlString, (err, data) => {
        if (!err) {
          res.json({ result: data.recordset });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  show = async (req, res) => {
    try {
      let id = req.params.id;
      let pool = await conn;
      let sqlString = querysDriver.getDriverById;
      return await pool
        .request()
        .input("ma_tai_xe", sql.Int, id)
        .query(sqlString, (err, data) => {
          if (!err) {
            res.json({ result: data.recordset });
          } else {
            res.json({
              message: "Không thể tìm kiếm được",
              error: err.message,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  createDriver = async (req, res) => {
    try {
      let pool = await conn;

      let sqlString = querysDriver.createDriver;
      return await pool
        .request()
        .input("ma_cong_ty", sql.Int, req.body.ma_cong_ty)
        .input("tenTX", sql.NVarChar, req.body.tenTX)
        .input("ngay_sinh", sql.NVarChar, req.body.ngay_sinh)
        .input("sdtTX", sql.NVarChar, req.body.sdtTX)
        .input("dia_chi_TX", sql.NVarChar, req.body.dia_chi_TX)
        .query(sqlString, (err, data) => {
          if (!err) {
            res.json({ message: "Thêm thông tin thành công", result: data });
          } else {
            res.json({
              message: "Thêm thông tin thất bại",
              error: err.message,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  updateDriver = async (req, res) => {
    try {
      let pool = await conn;
      let id = req.params.id;
      let sqlString = querysDriver.updateDriver;
      return await pool
        .request()
        .input("ma_tai_xe", sql.Int, id)
        // .input("ma_cong_ty", sql.Int, req.body.ma_cong_ty)
        .input("tenTX", sql.NVarChar, req.body.tenTX)
        .input("ngay_sinh", sql.Date, req.body.ngay_sinh)
        .input("sdtTX", sql.NVarChar, req.body.sdtTX)
        .input("dia_chi_TX", sql.NVarChar, req.body.dia_chi_TX)
        .query(sqlString, (err, data) => {
          if (!err) {
            res.json({
              message: "Cập nhật thông tin thành công",
              result: data,
            });
          } else {
            res.json({
              message: "Cập nhật thông tin thất bại",
              error: err.message,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  deleteDriver = async (req, res) => {
    try {
      let id = req.params.id;
      let pool = await conn;
      let sqlString = querysDriver.deleteDriver;
      return await pool
        .request()
        .input("ma_tai_xe", sql.Int, id)
        .query(sqlString, (err, data) => {
          if (!err) {
            res.json({ message: "Xoá thông tin thành công", data: data });
          } else {
            res.json({ message: "Xoá thông tin thất bại" });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = new DriverController();

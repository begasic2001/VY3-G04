const { conn, sql } = require("../../config/db/sql");
const { querysCompany } = require("../../config/db/sql_query");
class CompanyController {
  getAllIdCompany = async(req,res)=>{
    try {
      let pool = await conn;
      let sqlString = querysCompany.getAllIdCompany;
      return await pool.request().query(sqlString, (err, data) => {
        res.json({result:data.recordset});
      });
    } catch (err) {
      res.json(err);
    }
  }

  getAllCompany = async (req, res) => {
    try {
      let pool = await conn;
      let sqlString = querysCompany.getAllCompany;
      return await pool.request().query(sqlString, (err, data) => {
        res.json({result:data.recordset});
      });
    } catch (err) {
      res.json(err);
    }
  };

  show = async (req, res, next) => {
    try {
      const id = req.params.id;
      let pool = await conn;
      let sqlString = querysCompany.getCompanyWithId;
      return (company = await pool
        .request()
        .input("ma_cong_ty", sql.Int, id)
        .query(sqlString, (err, data) => {
          res.json({result:data.recordset});
        }));
    } catch (err) {
      console.log(err);
    }
  };

  createCompany = async (req, res) => {
    try {
      let pool = await conn;
      let sqlString = querysCompany.createCompany;
      return await pool
        .request()
        // .input("ma_cong_ty", sql.NVarChar, req.body.ma_cong_ty)
        .input("tenCT", sql.NVarChar, req.body.tenCT)
        .input("emailCT", sql.NVarChar, req.body.emailCT)
        .input("sdtCT", sql.NVarChar, req.body.sdtCT)
        .input("dia_chi_CT", sql.NVarChar, req.body.dia_chi_CT)
        .query(sqlString, (err, data) => {
          if (err) {
            res.json({ message: "Tạo mới thất bại" });
          }
          res.json({ message: "Nhập thông tin thành công", result: data });
        });
    } catch (err) {
      console.log(err);
    }
  };

  updateCompany = async (req, res) => {
    try {
      let pool = await conn;
      const id = req.params.id;
      let sqlString = querysCompany.updateCompany;
      return await pool
        .request()
        .input("ma_cong_ty", sql.Int, id)
        // .input("ma_cong_ty", sql.NVarChar, id)
        .input("tenCT", sql.NVarChar, req.body.tenCT)
        .input("emailCT", sql.NVarChar, req.body.emailCT)
        .input("sdtCT", sql.NVarChar, req.body.sdtCT)
        .input("dia_chi_CT", sql.NVarChar, req.body.dia_chi_CT)
        .query(sqlString, (err, data) => {
          if (err) {
            res.json({ message: "Không thể sửa được thông tin" });
          }
          res.json({ message: "Cập nhật thông tin thành công", result: data });
        });
    } catch (err) {
      console.log(err);
    }
  };

  deleteCompany = async (req, res) => {
    try {
      const id = req.params.id;
      let pool = await conn;
      let sqlString = querysCompany.deleteCompany;
      return await pool
        .request()
        .input("ma_cong_ty", sql.NVarChar, id)
        .query(sqlString, (err, data) => {
          if (err) {
            res.json({ message: "Không thể xoá thông tin của công ty" });
          }
          res.json({
            message: "Xoá thành công thông tin công ty",
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = new CompanyController();


const { conn, sql } = require("../../config/db/sql");
class BooksController {
  //[GET] api/getAllTrip
  async getAllTrip(req, res, next) {
    //mssql
    const pool = await conn;
    const sqlString = "SELECT * FROM chuyen_di   "; //c,xe x WHERE c.ma_xe = x.ma_xe
    return await pool.request().query(sqlString, function (err, data) {
      console.log(err);
      res.json({ result: data.recordset });
    });
  }
  //[GET] api/getTrip/:id
  async show(req, res, next) {
    const id = req.params.id;
    const pool = await conn;
    const sqlString = "SELECT * FROM chuyen_di WHERE ma_chuyen_di =@varid ";

    return await pool
      .request()
      .input("varid", sql.Int, id)
      .query(sqlString, function (err, data) {
        if (data.recordset.length > 0) {
          res.json({ result: data.recordset[0] });
        } else {
          res.json({ result: null });
        }
      });
  }
  //[GET] booking/create
  // create(req, res, next) {
  // 	res.render('partners/create');
  // }

  //[POST] api/createTrip
  async createTrip(req, res, next) {
    
    const pool = await conn;
    const sqlString =
      "INSERT INTO chuyen_di(noi_di,noi_den,ngay_bat_dau,ngay_ket_thuc,gio_bat_dau,gio_ket_thuc,so_luong,hanh_ly,ma_xe,noi_trung_gian,don_gia) VALUES (@noi_di,@noi_den,@ngay_bat_dau,@ngay_ket_thuc,@gio_bat_dau,@gio_ket_thuc,@so_luong,@hanh_ly,@ma_xe,@noi_trung_gian,@don_gia)";
    return await pool
      .request()
      .input("ma_xe", sql.NVarChar, req.body.ma_xe)
      .input("noi_di", sql.NVarChar, req.body.noi_di)
      .input("noi_trung_gian", sql.NVarChar, req.body.noi_trung_gian)
      .input("noi_den", sql.NVarChar, req.body.noi_den)
      .input("ngay_bat_dau", sql.Date, req.body.ngay_bat_dau)
      .input("ngay_ket_thuc", sql.Date, req.body.ngay_ket_thuc)
      .input("gio_bat_dau", sql.Time, req.body.gio_bat_dau)
      .input("gio_ket_thuc", sql.Time, req.body.gio_ket_thuc)
      .input("so_luong", sql.Int, req.body.so_luong)
      .input("hanh_ly", sql.Int, req.body.hanh_ly)
      .input("don_gia", sql.Int, req.body.don_gia)
      
      // .input('hinh_anh', sql.NVarChar, req.body.hinh_anh)
      
      // .input('gio_den_2', sql.Time, req.body.gio_den_2)

      .query(sqlString, function (err, data) {
        res.json({ msg: "Thêm dữ liệu thành công", result: data });
        
      });
  }
  // [GET] api/editTrip/:id
  async editTrip(req, res, next) {
    const id = req.params.id;
    const pool = await conn;
    const sqlString = "SELECT * FROM chuyen_di WHERE ma_chuyen_di =@varid ";
    return await pool
      .request()
      .input("varid", sql.Int, id)
      .query(sqlString, function (err, data) {
        if (data.recordset.length > 0) {
          res.json({ result: data.recordset[0] });
        } else {
          res.json({ result: null });
        }
      });
  }
  // [PUT] api/updateTrip/:id
  async updateTrip(req, res, next) {
    //mssql
    const id = req.params.id;
    const pool = await conn;
    const sqlString =
      "UPDATE chuyen_di SET noi_di=@noi_di ,noi_den=@noi_den,ngay_bat_dau=@ngay_bat_dau,ngay_ket_thuc=@ngay_ket_thuc,gio_bat_dau=@gio_bat_dau,gio_ket_thuc=@gio_ket_thuc,so_luong=@so_luong,hanh_ly=@hanh_ly,ma_xe=@ma_xe , noi_trung_gian=@noi_trung_gian , don_gia=@don_gia WHERE ma_chuyen_di=@ma_chuyen_di";
    return await pool
      .request()
      .input("ma_xe", sql.NVarChar, req.body.ma_xe)
      .input("noi_di", sql.NVarChar, req.body.noi_di)
      .input("noi_trung_gian", sql.NVarChar, req.body.noi_trung_gian)
      .input("noi_den", sql.NVarChar, req.body.noi_den)
      .input("ngay_bat_dau", sql.Date, req.body.ngay_bat_dau)
      .input("ngay_ket_thuc", sql.Date, req.body.ngay_ket_thuc)
      .input("gio_bat_dau", sql.Time, req.body.gio_bat_dau)
      .input("gio_ket_thuc", sql.Time, req.body.gio_ket_thuc)
      .input("so_luong", sql.Int, req.body.so_luong)
      .input("hanh_ly", sql.Int, req.body.hanh_ly)
      .input("don_gia", sql.Int, req.body.don_gia)
      // .input('hinh_anh', sql.NVarChar, req.body.hinh_anh)
      .input("ma_chuyen_di", sql.NVarChar, id)
      .query(sqlString, function (err, data) {
        res.json({ result: data.recordset });
        // res.redirect('http://localhost:3000/admin');
      });
  }
  // [DELETE] api/deleteTrip/:id
  async deleteTrip(req, res, next) {
    const id = req.params.id;
    const pool = await conn;
    const sqlString = "DELETE FROM chuyen_di WHERE ma_chuyen_di =@varid ";
    return await pool
      .request()
      .input("varid", sql.Int, id)
      .query(sqlString, function (err, data) {
        if (!err) {
          res.json({ result: "Xóa Thành Công" });
        } else {
          res.json({ result: "Xóa Thất Bại" });
        }
      });
  }
}
module.exports = new BooksController();

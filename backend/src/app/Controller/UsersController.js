<<<<<<< HEAD
const User = require('../Model/user.js')
const {conn, sql} = require('../../config/db/sql')
const bcrypt =require("bcrypt")
// const jwt = require("jsonwebtoken")
=======
const {conn, sql} = require('../../config/db/sql')
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config();
const accessKey = "process.env.JWT_ACCESS_KEY"
const refreshKey = "process.env.JWT_REFRESH_KEY"
>>>>>>> a06811a (Upload V2)
let refreshTokens = []

class UsersController{
   
    index(req,res,next){
<<<<<<< HEAD
        Booking.find({})
            .then(bookings => res.render('user/user-search',{
                // res.json(bookings)
                bookings: mulBookingToOject(bookings)
            }))
=======
        // Booking.find({})
        //     .then(bookings => res.render('user/user-search',{
        //         // res.json(bookings)
        //         bookings: mulBookingToOject(bookings)
        //     }))
>>>>>>> a06811a (Upload V2)
      
    }
    async search(req,res,next){

    const pool =  await conn
    const sqlString = "SELECT * FROM chuyen_di WHERE noi_di =@noi_di AND noi_den=@noi_den AND ngay_bat_dau=@ngay_bat_dau AND gio_bat_dau=@gio_bat_dau "
    return await pool.request()
    .input('noi_di',sql.NVarChar,req.body.noi_di)
    .input('noi_den',sql.NVarChar,req.body.noi_den)
    .input('ngay_bat_dau',sql.Date,req.body.ngay_bat_dau)
    .input('gio_bat_dau',sql.Date,req.body.gio_bat_dau)
    .query(sqlString,function(err,data){
        if(data.recordset.length >0){
            res.json({ressult:data})
        }else{
            res.json({result:"Không Tìm Thấy Chuyến Đi"})
        }
       
    })
    }





    // lấy tất cả người dùng ( chỉ test code)
    show(req,res,next){
            User.find({})
            .then(result => res.status(200).json(result) )
            .catch(next)
    }

    // xóa người dùng

    async delete(req,res,next){
<<<<<<< HEAD
        await User.findByIdAndDelete(req.params.id)
        .then( ()=> res.status(200).json("Xoá Thành Công!!!!"))
        .catch(next)
=======
        const id = req.params.id;
		const pool = await conn;
		const sqlString = 'DELETE FROM khach_dat WHERE ma_khach_dat =@ma_khach_dat ';
		return await pool
			.request()
			.input('ma_khach_dat', sql.Int, id)
			.query(sqlString, function (err, data) {
				if (!err) {
					res.json({ result: 'Xóa Thành Công' });
				} else {
					res.json({ result: 'Xóa Thất Bại' });
				}
			});
>>>>>>> a06811a (Upload V2)
    }


    // tạo user
    async create(req,res,next){
       const salt =await bcrypt.genSalt(10)
<<<<<<< HEAD
       const hashed =await bcrypt.hash(req.body.password,salt)

       // tạo user mới
       const newUser =await new User({
           username:req.body.username,
           email:req.body.email,
           password:hashed
       })
       const user = await newUser.save()
       res.status(200).json(user)
=======
       const hashed =await bcrypt.hash(req.body.matkhau,salt)
       const taiKhoan = req.body.taiKhoan
       const tenKH = req.body.tenKH
       const diachiKH = req.body.diachiKH
        const CMND = req.body.CMND;
       const dienthoaiKH = req.body.dienthoaiKH
       const gioitinh = req.body.gioitinh
       const email = req.body.email
       const pool = await conn
       const sqlString =
           'INSERT INTO khach_dat (tenKH,diachiKH,CMND,dienthoaiKH,taiKhoan,matkhau,gioitinh,email) Values (@tenKH,@diachiKH,@CMND,@dienthoaiKH,@taikhoan,@matkhau,@gioitinh,@email) ';
       return await pool
           .request()
           .input('tenKH', sql.NVarChar, tenKH)
           .input('diachiKH', sql.NVarChar, diachiKH )
           .input('CMND', sql.NVarChar, CMND)
           .input('dienthoaiKH', sql.NVarChar,dienthoaiKH)
           .input('taiKhoan', sql.NVarChar, taiKhoan)
           .input('matkhau', sql.NVarChar, hashed)
           .input('gioitinh', sql.NVarChar, gioitinh)
           .input('email', sql.NVarChar, email)
         
           .query(sqlString, function (err, data) {
               res.status(200).json({result:data.recordset})
           });
       // tạo user mới
    //    const newUser =await new User({
    //        username:req.body.username,
    //        email:req.body.email,
    //        password:hashed
    //    })
    //    const user = await newUser.save()
      
>>>>>>> a06811a (Upload V2)
    }


    // login user
    async login(req,res,next){
<<<<<<< HEAD
        const user = await User.findOne({username:req.body.username})
        if(!user){
            res.status(404).json("tên người dùng nhập sai");
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            res.status(404).json("mật khẩu người dùng nhập sai");
        }
        if(user && validPassword){
            const accessToken = jwt.sign({
                id: user._id,
                admin:user.admin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "2h"}
            )
            const refreshToken = jwt.sign({
                id:user._id,
                admin:user.admin
            },
            process.env.JWT_REFRESH_KEY,
            {expiresIn: "2h"}
            )
            refreshTokens.push(refreshToken)
            res.cookie("refreshToken",refreshToken, {
                httpOnly:true,
                secure:false,
                path:"/",
                samSite:"strict"
            })
            const {password, ...others} = user._doc
            res.status(200).json({...others,accessToken})
        }
=======
        const taiKhoan = req.body.taiKhoan;
        const matkhau = req.body.matkhau;
        if(taiKhoan && matkhau){
            const pool = await conn
		const sqlString = 'SELECT * FROM khach_dat WHERE taiKhoan =@taiKhoan';
		return await pool
			.request()
			.input('taiKhoan', sql.NVarChar, taiKhoan)
           
			.query(sqlString, function (err, data) {
                if(err){
                    res.send({err:err})
                }
                if(data.recordset.length>0){
                    bcrypt.compare(matkhau,data.recordset[0].matkhau,function(err,result){
                        if(result){
                            // console.log(data.recordset[0].taiKhoan)
                            const accessToken = jwt.sign({taiKhoan:data.recordset[0].taiKhoan},
                                    accessKey,
                                    {expiresIn: "2h"})
                                    const refreshToken = jwt.sign({
                                        taiKhoan:data.recordset[0].taiKhoan,
                                    },
                                    refreshKey,
                                    {expiresIn: "2h"})
                                    refreshTokens.push(refreshToken)
                                        res.cookie("refreshToken",refreshToken, {
                                                httpOnly:true,
                                                secure:false,
                                                path:"/",
                                                samSite:"strict"
                                            })
                                            const {matkhau, ...others} = data.recordset[0]
                                            res.status(200).json({...others,accessToken})
                        }else{
                            res.json({status:404,msg:"Sai tài khoản/mật khẩu"})
                        }
                    })
                }
			});
        }else{
            res.send("Vui lòng nhập tài khoản và mật khẩu")
        }
        
               
        
        // const user = await User.findOne({username:req.body.username})
        // if(!user){
        //     res.status(404).json("tên người dùng nhập sai");
        // }
        // const validPassword = await bcrypt.compare(
        //     req.body.password,
        //     user.password
        // )
        // if(!validPassword){
        //     res.status(404).json("mật khẩu người dùng nhập sai");
        // }
        // if(user && validPassword){
        //     const accessToken = jwt.sign({
        //         id: user._id,
        //         admin:user.admin
        //     },
        //     process.env.JWT_ACCESS_KEY,
        //     {expiresIn: "2h"}
        //     )
        //     const refreshToken = jwt.sign({
        //         id:user._id,
        //         admin:user.admin
        //     },
        //     process.env.JWT_REFRESH_KEY,
        //     {expiresIn: "2h"}
        //     )
        //     refreshTokens.push(refreshToken)
        //     res.cookie("refreshToken",refreshToken, {
        //         httpOnly:true,
        //         secure:false,
        //         path:"/",
        //         samSite:"strict"
        //     })
        //     const {password, ...others} = user._doc
        //     res.status(200).json({...others,accessToken})
        // }
>>>>>>> a06811a (Upload V2)
    }

    async refresh(req,res,next){
        const refreshToken = req.cookie.refreshToken
        if(!refreshToken){
            return res.json('Bạn chưa xác nhận')
        }
        if(!refreshTokens.includes(refreshToken)){
            return res.json("refresh token thất bại")
        }
<<<<<<< HEAD
        jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,user)=>{
=======
        jwt.verify(refreshToken,refreshKey,(err,data)=>{
>>>>>>> a06811a (Upload V2)
            if(err){
                console.log(err)
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            // tạo mới accesstoken và refresh token
<<<<<<< HEAD
            const newAccessToken = jwt.sign({
                id: user._id,
                admin:user.admin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "2h"}
            )
            const newRefreshToken =  jwt.sign({
                id:user._id,
                admin:user.admin
            },
            process.env.JWT_REFRESH_KEY,
=======
            const newAccessToken = jwt.sign({taiKhoan:data.recordset[0].taiKhoan},
            accessKey,
            {expiresIn: "2h"}
            )
            const newRefreshToken =  jwt.sign({taiKhoan:data.recordset[0].taiKhoan},
            refreshKey,
>>>>>>> a06811a (Upload V2)
            {expiresIn: "2h"}
            )
            res.cookie("refreshToken",newRefreshToken, {
                httpOnly:true,
                secure:false,
                path:"/",
                samSite:"strict"
            })
            res.json({accessToken:newAccessToken})
        })
    }

    // đăng xuất tài khoản
    logout(req,res,next){
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("đăng xuất thành công")
    }

   
}
module.exports = new UsersController()


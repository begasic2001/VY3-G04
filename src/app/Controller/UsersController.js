const User = require('../Model/user.js')
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const Booking = require('../Model/Booking.js')
const { mulBookingToOject }= require('../../ultils/mongooes')
const { BookingToOject }= require('../../ultils/mongooes')

let refreshTokens = []

class UsersController{
   
    index(req,res,next){
        Booking.find({})
            .then(bookings => res.render('user/user-search',{
                // res.json(bookings)
                bookings: mulBookingToOject(bookings)
            }))
      
    }

    // lấy tất cả người dùng ( chỉ test code)
    show(req,res,next){
            User.find({})
            .then(result => res.status(200).json(result) )
            .catch(next)
    }

    // xóa người dùng

    async delete(req,res,next){
        await User.findByIdAndDelete(req.params.id)
        .then( ()=> res.status(200).json("Xoá Thành Công!!!!"))
        .catch(next)
    }


    // tạo user
    async create(req,res,next){
       const salt =await bcrypt.genSalt(10)
       const hashed =await bcrypt.hash(req.body.password,salt)

       // tạo user mới
       const newUser =await new User({
           username:req.body.username,
           email:req.body.email,
           password:hashed
       })
       const user = await newUser.save()
       res.status(200).json(user)
    }


    // login user
    async login(req,res,next){
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
    }

    async refresh(req,res,next){
        const refreshToken = req.cookie.refreshToken
        if(!refreshToken){
            return res.json('Bạn chưa xác nhận')
        }
        if(!refreshTokens.includes(refreshToken)){
            return res.json("refresh token thất bại")
        }
        jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,user)=>{
            if(err){
                console.log(err)
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            // tạo mới accesstoken và refresh token
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


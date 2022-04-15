const express = require('express')
const middlewareController = require('../app/Controller/MiddlewareConttroler')
const router = express.Router()
const usersController = require('../app/Controller/UsersController')

// refresh token 
router.post('/refresh',usersController.refresh)


// lấy tất cả người dùng ( chỉ test code )
router.get('/alluser',middlewareController.verifyToken,usersController.show)

// xóa người dùng
<<<<<<< HEAD
router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,usersController.delete)
=======
router.delete('/:id',usersController.delete) //middlewareController.verifyTokenAndAdminAuth,
>>>>>>> a06811a (Upload V2)

// đăng nhập tài khoản
router.post('/dangnhap',usersController.login)

// đăng ký tài khoản
router.post('/dangky',usersController.create)

// đăng xuất tài khoản
router.post('/dangxuat',middlewareController.verifyToken,usersController.logout)


// tìm kiếm chuyến đi
router.post('/store',usersController.search)


// trang chủ
router.get('/',usersController.index)



module.exports = router
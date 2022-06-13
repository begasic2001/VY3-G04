const express = require('express');
const middlewareController = require('../app/Controller/MiddlewareConttroler');
const router = express.Router();
const usersController = require('../app/Controller/UsersController');

// refresh token
router.post('/refresh', usersController.refresh);

// lấy tất cả người dùng ( chỉ test code )
router.get('/alluser', middlewareController.verifyToken, usersController.show);

// xóa người dùng
router.delete('/:id', usersController.delete); //middlewareController.verifyTokenAndAdminAuth,

// đăng nhập tài khoản
router.post('/dangnhap', usersController.login);
// đăng nhập tài khoản partner
router.post('/partnerdangnhap', usersController.loginPartner);
// đăng ký tài khoản customer
router.post('/dangky', usersController.create);
// đăng ký tài khoản partner
router.post('/partnerdangky', usersController.createPartner);

// đăng xuất tài khoản
router.post(
	'/dangxuat',
	middlewareController.verifyToken,
	usersController.logout
);

// tìm kiếm chuyến đi

router.get('/getAllBooking', usersController.getAllBooking);

// chọn chuyến đi
router.get('/getBookingId/:id', usersController.getBookingId);

// nguời dùng đặt vé (thông tin khách đi)
router.post(
	'/bookingOrder/:id',
	middlewareController.verifyToken,
	usersController.bookingOrder
);

router.get('getUserOder', usersController.getUserOder);

// lưu thông tin khách đi khi thanh toán
router.post(
	'/bookingOrder2/:idKhach/:idChuyen',
	middlewareController.verifyToken,
	usersController.bookingOrder2
);
// lịch sử đặt vé
router.get(
	'/history',
	middlewareController.verifyToken,
	usersController.history
);
// cập nhật trạng thái đặt vé
router.post(
	'/updateStatus',
	middlewareController.verifyToken,
	usersController.updateStatus
);
// khách đặt hủy vé
router.post(
	'cancelBooking',
	middlewareController.verifyToken,
	usersController.cancelBooking
);
// trang chủ
router.get('/', usersController.index);

module.exports = router;

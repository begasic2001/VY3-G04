const express = require("express");
const router = express.Router();
const middlewareController = require("../app/Controller/MiddlewareConttroler");
const RevenuesController = require("../app/Controller/RevenuesController");
//middlewareController.verifyToken,
//router.get("/", RevenuesController.index);
// thông tin 2 bảng khách đặt và hóa đơn
// router.get("/infoCustomer", RevenuesController.infoCustomer);
// //thông tin 2 bảng khách đi và hóa đơn
// router.get("/infoBill", RevenuesController.infoBill);
//thông tin 4 bảng khách đặt , khách đi , hóa đơn , chuyến đi
router.get("/detailCusBook", RevenuesController.detailCusBook);
// thông tin biểu đồ doanh thu theo tháng và tổng tiền hóa đơn
router.get("/chart", RevenuesController.chart);
// Đếm số lượng tài khoản khách chỉ trả về số
// router.get("/totalUser", RevenuesController.totalUser);
// Trả về thông tin tất cả các trường trong bảng KHÁCH ĐẶT
router.get("/customer", RevenuesController.customer);
module.exports = router;

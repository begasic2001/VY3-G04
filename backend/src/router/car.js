const express = require("express");
const router = express.Router();
const CarsController = require("../app/Controller/CarsController");
// const multer = require('multer')
// const Multer = multer({
//    storage:multer.memoryStorage(),
//    limits:1024*1024
//   })
// const uploadImage = require('../config/db/firebase.js')
router.get("/getallcar", CarsController.getAllCar);
router.get("/getCar/:id", CarsController.show);
router.delete("/deleteCar/:id", CarsController.deleteCar);
router.post("/createCar", CarsController.createCar); //,Multer.single('hinh_anh'),uploadImage
router.put("/updateCar/:id", CarsController.updateCar); //,Multer.single('hinh_anh'),uploadImage
router.get("/index", CarsController.index);

module.exports = router;

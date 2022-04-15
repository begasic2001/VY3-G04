const express = require('express')
const router = express.Router()
const CarsController = require('../app/Controller/CarsController')
const upload = require('../app/Controller/UploadController')

router.get('/getallcar', CarsController.getAllCar);
router.get('/getCar/:id', CarsController.show);
router.delete('/deleteCar/:id', CarsController.deleteCar)
router.post('/createCar',upload.single('hinh_anh'), CarsController.createCar);
router.put('/updateCar/:id',upload.single('hinh_anh'), CarsController.updateCar)


module.exports = router
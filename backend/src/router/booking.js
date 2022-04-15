const express = require('express')
const router = express.Router()
const booksController = require('../app/Controller/BooksController')
const upload = require('../app/Controller/UploadController')

<<<<<<< HEAD
router.post('/store',upload.single('image'), booksController.store)
router.get('/create', booksController.create)
router.get('/:id/edit',upload.single('image'), booksController.edit)
router.put('/:id',upload.single('image'), booksController.update)
router.delete('/:id', booksController.delete)
router.get('/:id', booksController.show)
router.get('/', booksController.index)
=======
router.post('/createTrip',upload.single('hinh_anh'), booksController.createTrip)
// router.get('/create', booksController.create)
router.get('/editTrip/:id',upload.single('hinh_anh'), booksController.editTrip)
router.put('/updateTrip/:id',upload.single('hinh_anh'), booksController.updateTrip)
router.delete('/deleteTrip/:id', booksController.deleteTrip)
router.get('/getTrip/:id', booksController.show)
router.get('/getAllTrip', booksController.getAllTrip)
>>>>>>> a06811a (Upload V2)

module.exports = router
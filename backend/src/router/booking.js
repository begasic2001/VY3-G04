const express = require('express')
const router = express.Router()
const booksController = require('../app/Controller/BooksController')
const upload = require('../app/Controller/UploadController')

router.post('/store',upload.single('image'), booksController.store)
router.get('/create', booksController.create)
router.get('/:id/edit',upload.single('image'), booksController.edit)
router.put('/:id',upload.single('image'), booksController.update)
router.delete('/:id', booksController.delete)
router.get('/:id', booksController.show)
router.get('/', booksController.index)

module.exports = router
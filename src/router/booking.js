const express = require('express')
const router = express.Router()
const booksController = require('../app/Controller/BooksController')


router.post('/store', booksController.store)
router.get('/create', booksController.create)
router.get('/:id/edit', booksController.edit)
router.put('/:id', booksController.update)
router.delete('/:id', booksController.delete)
router.get('/:slug', booksController.show)
router.get('/', booksController.index)

module.exports = router
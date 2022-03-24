const express = require('express')
const router = express.Router()
const usersController = require('../app/Controller/UsersController')
router.get('/',usersController.index)



module.exports = router
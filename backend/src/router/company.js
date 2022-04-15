const express = require('express');
const router = express.Router();
const CompanysController = require('../app/Controller/CompanysController');
// const upload = require('../app/Controller/UploadController');

router.get('/getallCompany', CompanysController.getAllCompany);
router.get('/getCompany/:id', CompanysController.show);
router.delete('/deleteCompany/:id', CompanysController.deleteCompany);
router.post('/createCompany', CompanysController.createCompany);
router.put('/updateCompany/:id', CompanysController.updateCompany);

module.exports = router;

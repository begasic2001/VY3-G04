const express = require("express");
const router = express.Router();
const PaymentsController = require("../app/Controller/PaymentsController");
const upload = require("../app/Controller/UploadController");

router.post("/Stripe", PaymentsController.paymentStripe);
router.post("/PayPal", PaymentsController.paymentPayPal);
router.get("/success", PaymentsController.success);
router.get("/cancel", PaymentsController.cancel);
module.exports = router;

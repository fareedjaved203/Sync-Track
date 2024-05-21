const express = require("express");
const {
  postPayment,
  confirmPayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-payment-intent", postPayment);
router.post("/confirm-payment", confirmPayment);

module.exports = router;

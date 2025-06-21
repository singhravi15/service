const express = require("express");
const router = express.Router();
const { createOrder, updatePaymentStatus } = require("../controllers/orderController");

router.post("/orders", createOrder);
router.put("/orders/:orderId/pay", updatePaymentStatus);

module.exports = router;

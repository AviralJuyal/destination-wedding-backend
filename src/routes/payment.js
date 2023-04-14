const express = require("express");
const { orders, verify } = require("../controllers/payment");
const router = express.Router();

router.post('/orders', orders)
router.post('/verify', verify)
module.exports = router;
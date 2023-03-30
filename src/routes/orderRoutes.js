const express = require("express");
const { orderDelete , orderUpdate , orderDetail ,ordersOfUser ,createOrder } = require("../controllers/orderController");
const { fetchuser} = require("../middleware/fetchuser");
const router = express.Router();

router.route('/:id')
        .put(orderUpdate)
        .delete(orderDelete)
        .get(orderDetail)

router.route('/')
        .get(fetchuser , ordersOfUser)
        .post(createOrder)



module.exports = router;
const express = require("express");
const { orderDelete , orderUpdate , orderDetail ,ordersOfUser ,createOrder } = require("../controllers/orderController");
const { fetchuser} = require("../middleware/fetchuser");
const router = express.Router();

router.route('/order/:id')
        .put(orderUpdate)
        .delete(orderDelete)
        .get(orderDetail)

router.route('/order')
        .get(fetchuser , ordersOfUser)
        .post(createOrder)



module.exports = router;
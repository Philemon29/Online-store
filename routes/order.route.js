const { auth } = require('../middleware/auth.middleware');

const router = require('express').Router();
const{ placeOrder, confirmOrder, getOrders } = require('../contoller/order.controller')


router.post("/place-order", auth, placeOrder)
router.get('/confirm-order', confirmOrder)
router.get('/get-orders', auth, getOrders)


module.exports = router
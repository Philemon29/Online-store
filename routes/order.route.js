const { auth } = require('../middleware/auth.middleware');

const router = require('express').Router();
const{ placeOrder, confirmOrder } = require('../contoller/order.controller')


router.post("/place-order", auth, placeOrder)
router.get('/confirm-order', confirmOrder)


module.exports = router
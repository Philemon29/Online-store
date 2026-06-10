const { auth } = require('../middleware/auth.middleware');

const router = require('express').Router();
const{ placeOrder } = require('../contoller/order.controller')


router.post("/place-order", auth, placeOrder)
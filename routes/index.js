const router = require('express').Router()

router.use("/auth", require('./auth.route'))
router.use('/user', require('./user.route'))
router.use('/products', require('./product.route'))
router.use('/carts', require('./cart.route'))
router.use('/orders', require('./order.route'))

module.exports = router
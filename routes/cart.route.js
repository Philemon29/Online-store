const { auth } = require('../middleware/auth.middleware')
const { addToCart , viewCart, deleteCart, clearCart} = require('../contoller/cart.controller')
const router = require('express').Router()

router.post('/add-cart', auth, addToCart)
router.get('/view-cart', auth, viewCart)
router.delete('/delete-cart/:id', auth, deleteCart)
router.delete('/clear-cart', auth, clearCart)
module.exports = router
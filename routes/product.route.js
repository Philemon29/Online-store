
const router = require('express').Router()
const { auth, adminOnly } = require('../middleware/auth.middleware')
const upload = require('../middleware/cloudinary.middleware')
const {createProduct, getAllProducts} = require('../contoller/product.controller')

router.post("/create-product", auth, adminOnly, upload.single('image'), createProduct)

router.get("/all-products", getAllProducts)

module.exports = router
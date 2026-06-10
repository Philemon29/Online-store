
const router = require('express').Router()
const { auth, adminOnly } = require('../middleware/auth.middleware')
const upload = require('../middleware/cloudinary.middleware')
const {createProduct, getAllProducts, getSingleProduct, updateProduct, searchProduct} = require('../contoller/product.controller')

router.post("/create-product", auth, adminOnly, upload.single('image'), createProduct)


router.get("/all-products", getAllProducts)
router.get("/get-product/:id", getSingleProduct)

router.patch("/update-product/:id", auth, adminOnly, upload.single("image"), updateProduct)
router.get("/search", searchProduct)

module.exports = router
const Cart = require('../model/cart.model')
const Order = require('../models/order.model')
const Product = require('../models/product.model')
const User = require('../models/user.model')


const placeOrder = async(userId) => {
    const user = await User.findById(userId);

    if(!user) throw new Error("User not found")

        //fetch cart Items

        const cartItems = await Cart.find({userId}).populate('productId')

        if(!cartItems.length) throw new Error("Cart is empty")

            const totalAmount = cartItems.reduce((sum, item) => {
                 const price = item.productId.price || 0;

                 return sum + price * item.quantity
            }, 0);

    // prepare payment data fro flutterwave

    const paymentData = {
        tx_ref: `tx-${Date.now()}`,
        amount: totalAmount,
        currency: "NGN",
        redirect_url: `${process.env.BACKEND_URL}/order/confrim-order`,
        customer: {
             email: user.email,
             name: user.name,
             phone: user.phone
        },

        customization: {
           title: "Order Payment",
           description: "Payment for items in your cart"
        }
    }

    const paymentResponse = await initializePayment(paymentData)
}
const Cart = require('../models/cart.model')
const Order = require('../models/order.modal')
const Product = require('../models/product.model')
const User = require('../models/user.model')
const { initializePayment, verifyPayment } = require('./payment.service')


const placeOrder = async(userId) => {
    const user = await User.findById(userId);

    if(!user) throw new Error("User not found")

        //fetch cart Items

        const cartItems = await Cart.find({userId}).populate('productId')

        console.log(`the cart item is ${cartItems}`)

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
        redirect_url: `${process.env.BACKEND_URL}/orders/confirm-order`,
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

    console.log(`the payment data is ${paymentResponse}`)


    const order = await Order.create({
         userId,
         products: cartItems.map((item) => ({
             productId: item.productId._id,
             quantity: item.quantity,
             price: item.productId.price

         })),
         totalAmount,
         paymentRef: paymentData.tx_ref,
         status: 'pending'
    })

    return{
        order,
        paymentLink: paymentResponse.data.link,
    }
}

const confirmOrder = async(transactionId) => {
     const verification = await verifyPayment(transactionId);

     console.log(verification)

     if(verification.status !== 'success'){
         throw new Error("Payment verification failed")
     }

    //  http://localhost:6000/api/order/confrim-order?status=completed&tx_ref=tx-1781607231704&transaction_id=10302986

     const tx_ref = verification.data.tx_ref;
     const amountPaid = verification.data.amount;
     const paymentStatus = verification.data.status;

     const order = await Order.findOne({paymentRef: tx_ref});
     if(!order) throw new Error("Order not found");

     if(paymentStatus === 'successful' ){
         order.status = 'completed';
         order.totalAmount = amountPaid;

         await order.save();

         const cartItems = await Cart.find({userId: order.userId})

         for(const item of cartItems){
              await Product.findByIdAndUpdate(
                 item.productId,
                 {$inc: {inStock: -item.quantity}},
                 {new: true}
              )
         }

         await Cart.deleteMany({userId: order.userId})
     }else{
        order.status = 'failed';
        await order.save()
     }

     return order
}



module.exports = {placeOrder, confirmOrder}
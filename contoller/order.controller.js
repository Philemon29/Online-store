const orderService = require('../services/order.service')

const placeOrder = async(req, res) => {
     try{
        const userId = req.user._id;

        const result = await orderService.placeOrder(userId);
        res.status(201).json({
            message: "Order placed successfully",
            order: result,
        })
     }catch(error){
            res.status(500).json({message: error.message || "Server error"})
     }
}

module.exports = {placeOrder}
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },

  price: {
    type: Number,
    required: [true, "Product price is required"],
  },

  description: {
    type: String,
    required: [true, "Product description is required"],
  },

  category: {
    type: String,
    required: [true, "Product category is required"],
  },

  inStock: {
    type: Number,
    required: [true, "Product count in stock is required"],
  },

  image: {
    type: String,
    required: [true, "Product image is required"],
  },
})

module.exports = mongoose.model('Product', productSchema)
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },    
    manufacturer: {
        type: String,
        required: true
    }
})

module.exports = Product = mongoose.model('products', ProductSchema)
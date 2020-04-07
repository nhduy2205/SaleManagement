const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    entry_price: {
        type: Number,
        required: true
    },
    export_price: {
        type: Number,
        required: true
    },
    entry_quantity: {
        type: Number,
        required: true
    },
    quantity_sold: {
        type: Number,
        default: 0
    },
    quantity_remaining: {
        type: Number
    },    
    manufacturer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Product = mongoose.model('products', ProductSchema)
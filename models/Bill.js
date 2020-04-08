const mongoose = require('mongoose')


const BillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_phone: {
        type: String,
        required: true
    },
    bills: [
        {
            id_product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            product: {
                type: String
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        }
    ],
    total_price: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Bill = mongoose.model('bills', BillSchema)
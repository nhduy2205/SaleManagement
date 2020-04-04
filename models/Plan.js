const mongoose = require ('mongoose')
 
const PlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    product_list: [
        {
            product: {
                type: String
            },
            qty: {
                type: Number
            },
            price: {
                type: Number
            }

        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

    
})

module.exports = Plan = mongoose.model('plans', PlanSchema )

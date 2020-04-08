const express = require('express')
const router = express.Router()
const moment = require('moment')
// const {check, validationResult} = require('express-validator')
const Product = require('./../../models/Product')
const Bill = require('./../../models/Bill')
const Plan = require('./../../models/Plan')
const User = require('./../../models/User')
const auth = require('./../../middleware/auth')
router.post('/', auth , async (req, res) => {
    try {
        const bill_of_user = await Bill.find({user: req.user.id})
        var count = 0;
        bill_of_user.map(val => {
            
            var dateNow = new Date()
            var today = moment(dateNow).format('YYYY-MM-DD')
            
            // console.log(moment(val.date).format('YYYY-MM-DD'))
            if(moment(val.date).format('YYYY-MM-DD') === today){
                
                count ++
                return count
            }
        })
        if(count === 1){
            return res.status(400).json({ errors: [{ msg: 'Bill\'s user today is already exists' }] })
        }
        const plan = await Plan.find({user: req.user.id})
        const today = new Date()
        const datenow = moment(today).format('YYYY-MM-DD')
        const plantoday = plan.filter(val => moment(val.date).format('YYYY-MM-DD') === datenow)[0]
        var total_price = 0;
        const user = await User.findById(req.user.id)
        const { bills } = req.body
        bills.map(val => total_price += val.quantity*val.price)
        
        const bill = new Bill({
            user,
            customer_name: req.body.customer_name,
            customer_phone: req.body.customer_phone,
            bills: req.body.bills,
            total_price,


        })
        await bill.save()
        bills.map( async val => {
            var product = await Product.findById(val.id_product)
            product.quantity_sold = parseInt(product.quantity_sold) + parseInt(val.quantity)
            product.quantity_remaining -= val.quantity
            await product.save()
        })
        // if(plantoday){
        //     plantoday.product_list.map( async val => {
        //         bills.map(  bill => {
        //             if(bill.id_product === val.id_product){
        //                 val.quantity -= bill.quantity
        //             }
        //             return val.quantity
        //         })
        //         await plantoday.save()
                
        //     })
        // }
        
        return res.status(200).json(bill)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error!')
        
    }
    

})


module.exports = router
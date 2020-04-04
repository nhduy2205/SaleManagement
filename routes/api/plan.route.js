const express = require ('express');
const router = express.Router();
const auth = require('./../../middleware/auth')
const admin = require('./../../middleware/admin')
const Plan = require('./../../models/Plan')
const User = require('./../../models/User')

router.post('/:id', auth, admin, async (req, res) => {
    const { product_list, dateBody } = req.body 

    try {
        const dateNow = new Date()
        const date = dateNow.getDate()
        const month = dateNow.getMonth()
        const year = dateNow.getFullYear()
        const user = await User.findById(req.params.id)
        var existPlan = await Plan.findOne({user: req.params.id})
        if(existPlan 
            && existPlan.date.getDate() === date
            && existPlan.date.getMonth() === month
            && existPlan.date.getFullYear() === year
            ){
            return res.status(400).json({msg: 'Plan is exist'})
        }
        
        var newPlan = new Plan({
            user: user,
            product_list: product_list,
            date: dateBody           
        })
        await newPlan.save()
        return res.status(200).json(newPlan)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json('Server Error!')
    }
})


module.exports = router
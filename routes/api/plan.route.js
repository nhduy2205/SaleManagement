const express = require ('express');
const router = express.Router();
const auth = require('./../../middleware/auth')
const admin = require('./../../middleware/admin')
const Plan = require('./../../models/Plan')
const User = require('./../../models/User')

router.post('/:id', auth, admin, async (req, res) => {
    const { product_list, date } = req.body 

    try {
        // const date = Date.now()
        const user = await User.findById(req.params.id)
        // var existPlan = await Plan.findOne({user: req.params.id})
        // if(existPlan && existPlan.date)
        var newPlan = new Plan({
            user: user,
            product_list: product_list,
            date: date            
        })
        await newPlan.save()
        return res.status(200).json(newPlan)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json('Server Error!')
    }
})


module.exports = router
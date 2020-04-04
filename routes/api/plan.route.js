const express = require ('express');
const router = express.Router();
const auth = require('./../../middleware/auth')
const admin = require('./../../middleware/admin')
const Plan = require('./../../models/Plan')
const User = require('./../../models/User')


// @route   DELETE api/plans/:id
// @desc    route post plan
// @access  Private
//Thêm mới kế hoạch
router.post('/:id', auth, admin, async (req, res) => {
    // const { product_list, date_now } = req.body 

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
            product_list: req.body,
            
                  
        })
        await newPlan.save()
        return res.status(200).json(newPlan)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json('Server Error!')
    }
})


// @route   GET api/plans/
// @desc    route get all plan
// @access  Private
//Xem kế hoạch
router.get('/', auth, admin, async (req, res) => {
    try {
        const plans = await Plan.find()
        return res.status(200).json(plans)    
    } catch (error) {
        console.error(error.message)
        return res.status(500).json('Server Error!')
    }
} )
// @route   GET api/plans/:id
// @desc    route get  plan by id user
// @access  Private
//Xem kế hoạch của user ngày hôm nay
router.get('/:id',  auth, async (req, res) => {
    try {
        const plan = await Plan.findOne({ user: req.params.id })
        return res.status(200).json(plan)
    } catch (error) {
        
    }
} )
module.exports = router
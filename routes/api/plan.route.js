const express = require ('express');
const router = express.Router();
const auth = require('./../../middleware/auth')
const admin = require('./../../middleware/admin')
const Plan = require('./../../models/Plan')
const User = require('./../../models/User')
const moment = require('moment')

// @route   DELETE api/plans/:id
// @desc    route post plan
// @access  Private
//Thêm mới kế hoạch
router.post('/:id', auth, admin, async (req, res) => {
    // const { product_list, date_now } = req.body 

    try {
        
        
        
        var allplan = await Plan.find({user : req.params.id})
        var count = 0;
        const existplan = allplan.map(val => {
            
            var dateNow = new Date()
            var today = moment(dateNow).format('YYYY-MM-DD')
            console.log(today)
            console.log(moment(val.date).format('YYYY-MM-DD'))
            if(moment(val.date).format('YYYY-MM-DD') === today){
                // console.log(moment(val.date).format('YYYY-MM-DD'))
                // console.log(val)
                count ++
                return count
            }
        })
        console.log(count)
        // existplan.map(val => count++)
        // console.log(count)
        if(count === 1 ){
            return res.status(400).json({ errors: [{ msg: 'Plan\'s user today is already exists' }] })
        }
        // const date = dateNow.getDate()
        // const month = dateNow.getMonth()
        // const year = dateNow.getFullYear()
        // const user = await User.findById(req.params.id)
        // var existPlan = await Plan.findOne({user: req.params.id})
        // if(existPlan 
        //     && existPlan.date.getDate() === date
        //     && existPlan.date.getMonth() === month
        //     && existPlan.date.getFullYear() === year
        //     ){
        //     return res.status(400).json({ errors: [{ msg: 'Plan\'s user today is already exists' }] })
        // }
        
        var user = await User.findById(req.params.id)
        console.log(user)
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
        const plans = await Plan.find().sort({date: -1})
        // console.log(moment('2020-04-06T15:14:42.632Z').format('YYYY-MM-DD'))
       
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
router.get('/mission',  auth, async (req, res) => {
    try {
        const dateNow = new Date()
        const today = moment(dateNow).format('YYYY-MM-DD')
        const plan = await Plan.find({ user: req.user.id })
        const plantoday = plan.map(val => {
            if(moment(val.date).format('YYYY-MM-DD') === today){
                // console.log(moment(val.date).format('YYYY-MM-DD'))
                // console.log(today)
                return val
            }
        })
        // var x = moment('2020-04-05T17:19:20.972Z').format('YYYY-MM-DD')
        // console.log(x)
        return res.status(200).json(plantoday[0])
    } catch (error) {
        console.error(error.message)
        return res.status(500).json('Server Error!')
    }
} )
module.exports = router
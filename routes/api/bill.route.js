const express = require('express');
const router = express.Router();
const moment = require('moment');
const {check, validationResult} = require('express-validator')
const Product = require('./../../models/Product');
const Bill = require('./../../models/Bill');
const Plan = require('./../../models/Plan');
const User = require('./../../models/User');
const auth = require('./../../middleware/auth');
const admin = require('./../../middleware/admin');


// @route   GET api/bills/
// @desc    route get bills
// @access  Private
//Xem all bills
router.get('/', auth, admin, async (req, res) => {
  try {
    var today = moment(new Date()).format('YYYY-MM-DD');

    const data = await Bill.find().sort({ date: -1 });
    const plantoday = data.filter(
      (val) => moment(val.date).format('YYYY-MM-DD') === today
    );
    return res.status(200).json(plantoday);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!');
  }
});

// @route   GET api/bills/id
// @desc    route get bill detail
// @access  Private
//Xem bill the id chi tiet don hang
// ?duy

router.get('/:id', admin, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ errors: [{ msg: 'Bill not found' }] });
    }
    res.status(200).json(bill);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/bills/
// @desc    route post bills
// @access  Private
//tạo bill trog ngày hôm nay
router.post('/', 
  [
    auth,
    // admin,
    check('customer_name', 'CustomerName is required')
      .not()
      .isEmpty(),
    check('customer_phone', 'Please include a valid email')
      .not()
      .isEmpty()
    
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const bill_of_user = await Bill.find({ user: req.user.id });
    var count = 0;
    bill_of_user.map((val) => {
      var dateNow = new Date();
      var today = moment(dateNow).format('YYYY-MM-DD');

      // console.log(moment(val.date).format('YYYY-MM-DD'))
      if (moment(val.date).format('YYYY-MM-DD') === today) {
        count++;
        return count;
      }
    });
    if (count === 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Bill's user today is already exists" }] });
    }
    const plan = await Plan.find({ user: req.user.id });
    const today = new Date();
    const datenow = moment(today).format('YYYY-MM-DD');
    const plantoday = plan.filter(
      (val) => moment(val.date).format('YYYY-MM-DD') === datenow
    )[0];
    var total_price = 0;
    const user = await User.findById(req.user.id);
    const { bills } = req.body;
    bills.map((val) => (total_price += val.quantity * val.price));

    const bill = new Bill({
      user,
      customer_name: req.body.customer_name,
      customer_phone: req.body.customer_phone,
      bills: req.body.bills,
      total_price,
    });
    await bill.save();
    bills.map(async (val) => {
      var product = await Product.findById(val.id_product);
      product.quantity_sold =
        parseInt(product.quantity_sold) + parseInt(val.quantity);
      product.quantity_remaining -= val.quantity;
      await product.save();
    });

    return res.status(200).json(bill);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!');
  }
});

module.exports = router;

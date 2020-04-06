const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('./../../middleware/auth')
const admin = require('./../../middleware/admin')
const User = require('../../models/User');

// @route    GET api/users
// @desc     GET all user
// @access   private
// xem all list  user 
router.get('/', auth, admin, async (req, res) => {
  try {
      const users = await User.find()
      return res.status(200).json(users) 
  } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
      
  }
})





// @route    POST api/users
// @desc     create user
// @access   private
// tạo  user 
router.post(
  '/',
  [
    // auth,
    // admin,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    const email = req.body.email;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        role: req.body.role
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route    PUT api/users
// @desc     UPDATE user
// @access   private
// update user 
router.put('/', 
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),      
      check('password', 'Password is required')
        .not()
        .isEmpty(), 
      check('newpassword', ' New Password is required')
        .not()
        .isEmpty(),   
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }  
    try {
        var user = await User.findById({_id: req.user.id})
        const userfield = {}
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res
                .status(400)
                .json({ errors: [{msg: 'Wrong password'}]})
        }
        const salt = await bcrypt.genSalt(10)      
        const newpassword = await bcrypt.hash(req.body.newpassword, salt);
        userfield.name = req.body.name
        userfield.password = newpassword
        user = await User.findByIdAndUpdate(
          {_id: req.user.id},
          { $set: userfield},
          { new: true }          
        )
        const payload = {
          user: {
            id: user.id,
            role: user.role
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
        

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }   
  }
)


// @route    DELETET api/users/:id
// @desc     DELETE user by id
// @access   private
// xóa user theo id
router.delete('/:id', auth, admin, async (req, res) => {
  try {
      const user = await User.findById({_id: req.params.id})
      if(!user){
          return res.status(404).json({ errors: [{msg: 'User not found'}]})
      }
      await User.findByIdAndDelete({_id: req.params.id})
      return res.status(200).json('user deleted successfully')
    
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
  }
})

module.exports = router;
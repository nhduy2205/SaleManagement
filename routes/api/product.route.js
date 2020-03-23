const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Product = require('./../../models/Product')
const auth = require('./../../middleware/auth');
const admin = require('./../../middleware/admin')

// @route   POST api/products
// @desc    route post product
// @access  Private
//Thêm sản phẩm
router.post('/', 
    [
        auth,
        admin,
        check('name', 'name is required')
            .not()
            .isEmpty(),
        check('price', 'price is required')    
            .not()
            .isEmpty(),
        check('quantity', 'quantity is required')    
            .not()
            .isEmpty(),
        check('manufacturer', 'manufacturer is required')    
            .not()
            .isEmpty()    
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const name = req.body.name;
        
        try {
            const product = await Product.findOne({name})
            if(product){
                return res.status(400).json({ errors: [{ msg: 'Product already exists' }] });
            }
            const newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                manufacturer: req.body.manufacturer

            })
            await newProduct.save()
            return res.status(201).json(newProduct)
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
)
// @route   PUT api/products
// @desc    route put product
// @access  Private
//Sửa sản phẩm
router.put('/', 
    [
        auth,
        admin,  
        check('name', 'name is required')
            .not()
            .isEmpty(),
        check('price', 'price is required')    
            .not()
            .isEmpty(),
        check('quantity', 'quantity is required')    
            .not()
            .isEmpty(),
        check('manufacturer', 'manufacturer is required')    
            .not()
            .isEmpty()       
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }        
    }
    
)
module.exports = router

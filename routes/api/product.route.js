const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Product = require('./../../models/Product')
const auth = require('./../../middleware/auth');
const admin = require('./../../middleware/admin')

// @route   GET api/products
// @desc    route get all product
// @access  Private
//Xem tất sản phẩm
router.get('/', auth, admin, async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.error(error.message)
        res.status(500).json('Server Error')
    }
})
// @route   GET api/products/pagination
// @desc    route get all product
// @access  Private
//Xem sản phẩm phân trang
router.get('/pagination', auth, admin, async (req, res) => {
    try {
        const products = await Product.find()
        const pageNo = req.query.pageNo
        const pageSize = req.query.pageSize
        const startIndex = (pageNo - 1) * pageSize;
        const endIndex = pageNo * pageSize
        var results = {}
        results.pagination = {
            pageSize: parseInt(pageSize),
            pageNo: parseInt(pageNo),
            totalRows: products.length
        }
        results.data = products.slice(startIndex, endIndex)
        
        res.status(200).json(results)
    } catch (error) {
        console.error(error.message)
        res.status(500).json('Server Error')
    }
})


// @route   GET api/products/:id
// @desc    route get product by id
// @access  Private
//Xem sản phẩm theo id
router.get('/:id', auth, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({ errors: [{ msg: 'Product not found' }] })
        }
        res.status(200).json(product)
    } catch(error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }

})



// @route   POST api/products
// @desc    route post product
// @access  Private
//Thêm sản phẩm
router.post('/', 
    [
        auth,
        admin,
        [check('name', 'name is required')
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
            .isEmpty()]    
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
                entry_price: req.body.price,
                export_price: req.body.price * 1.2,
                entry_quantity: req.body.quantity,
                quantity_remaining: req.body.quantity,
                manufacturer: req.body.manufacturer

            })
            await newProduct.save()
            return res.status(201).json(newProduct)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
)
// @route   PUT api/products/id
// @desc    route put product
// @access  Private
//Sửa sản phẩm
// router.put('/:id', 
//     [
//         auth,
//         admin,  
//         [check('name', 'name is required')
//             .not()
//             .isEmpty(),
//         check('price', 'price is required')    
//             .not()
//             .isEmpty(),
//         check('quantity', 'quantity is required')    
//             .not()
//             .isEmpty(),
//         check('manufacturer', 'manufacturer is required')    
//             .not()
//             .isEmpty()  ]     
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()){
//             return res.status(400).json({ errors: errors.array() });
//         }    
//         const productField = {} 
//         productField.name = req.body.name   
//         productField.price = req.body.price  
//         productField.quantity = req.body.quantity  
//         productField.manufacturer = req.body.manufacturer 
//         try {
//             let product = await  Product.findById(req.params.id)
//             if(!product){
//                 return res.status(404).json({ errors: [{ msg: 'Product not found' }] });
//             }
//             else{
//                 product = await Product.findByIdAndUpdate(
//                     { _id: req.params.id },
//                     { $set: productField },
//                     { new: true }
//                 )
//                res.json(product)
//             }
//             return res.status(200).json(product)
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send('Server Error');
//         } 
//     }
// )
// @route   DELETE api/products/:id
// @desc    route delete product
// @access  Private
//Xóa sản phẩm theo id
router.delete('/:id', auth, admin , async (req, res) => {
    try {
        const product = await Product.findById({_id: req.params.id})
        if(!product){
            return res.status(404).json({ errors: [{msg: 'Product not found'}]})
        }
        await Product.findByIdAndDelete({_id: req.params.id})
        return res.status(200).json('product deleted successfully')

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})
module.exports = router

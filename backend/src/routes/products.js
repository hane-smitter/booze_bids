import express from 'express';

import { upload } from '../middlewares/productupload.js';
import { validate } from '../middlewares/validator/index.js';

import {
    createProduct,
    getProducts,
    createProductBid, 
    getBidProducts} from '../controllers/products.js';

const router = express.Router();

// router.get('/', getProducts);
// router.post('/', createProduct);
router.route('/')
    .get(getProducts)
    .post(upload.single('productimg'), validate('createProduct'), createProduct, (error, req, res, next) => {
        console.log(error);
        if(error)
        res.status(400).json({err: error.message});
    });

router.post('/bid/create', validate('createProductBid'), createProductBid);
router.get('/bids', getBidProducts);

export default router;
import express from 'express';

import { upload } from '../middlewares/productupload.js';
import { validate } from '../middlewares/validator/index.js';

import {
    createProduct,
    getProducts,
    createProductBidDetails, 
    getBidProducts,
    getBiddableProducts,
    deleteProduct,
    updateProduct
} from '../controllers/products.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(upload.single('productimg'), validate('createProduct'), createProduct, (error, req, res, next) => {
        if(error){
            console.log(error);
            res.status(400).json({err: [{msg: error.message}]});
        }
    });

router.post('/bid/create', validate('createProductBid'), createProductBidDetails);
router.get('/bids/all', getBidProducts);
router.get('/bids', getBiddableProducts);
router.delete('/mod', validate('deleteProduct'), deleteProduct);
router.patch('/mod/update/:id', validate('updateProduct'), updateProduct);

export default router;
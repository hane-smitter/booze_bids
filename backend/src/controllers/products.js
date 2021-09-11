import fs from 'fs';
import { validationResult } from 'express-validator';

import Product from '../models/Product.js';
import ProductBidDetail from '../models/ProductBidDetail.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({productbidscount: { $gt: 0 }}).populate(['productbids', 'productbidscount']);
        /* .exec(function(error, bids) {
            if(error) throw error;
            console.log('here is the bids meen!!');
            console.log(bids.productbids);
        }) */;
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: [{error: "Server is temporarily down!"}]});
    }
}

export const getBiddableProducts = async(req, res) => {
    try {
        const biddableProducts = await ProductBidDetail.find({endTime: { $gt: new Date().toISOString() }}).populate(['product']);
        res.json(biddableProducts);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: [{error: "Server is temporarily down!"}]});
    }
}

export const createProduct = async (req, res) => {
    const errors = validationResult(req);
    let fileErr = [];
    if(!req.file) {
        fileErr.push({
            value: "",
            msg: "Please upload a file",
            param: "productimg",
            location: "body"
        });
    }

    if (!errors.isEmpty() || !req.file) {
        res.status(422).json({ err: [...(errors.array() || []), ...(fileErr || []) ]});
        return;
    }

    const URL = process.env.APP_URL ?? "http://localhost:5000";
    const filePath = `${URL}/imgs/products/${req.file.filename}`;
    try {
        const product = new Product({...req.body, image: filePath});
        console.log('product');
        console.log(product);
        await product.save();
        res.status(201).json({product});
    } catch (err) {
        req.file && fs.unlink(`${req.file.destination}/${req.file.filename}`, (error) => {
            if(error)
                throw error;
            console.log('Uploaded file deleted successfully!');
        });
        console.log(err);
        res.status(400).json({err: [{error: err.message}]});
    }
}

export const getBidProducts = async (req, res) => {
    try {
        const productBids = await ProductBidDetail.find().populate('product');
        res.json(productBids);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: [{error: "Server is temporarily down!"}]});
    }
}

export const createProductBid = async(req, res) => {
    const errors = validationResult(req);
    console.log("req.body");
    console.log(req.body);
    if (!errors.isEmpty()) {
        res.status(422).json({ err: errors.array()});
        return;
    }
    try {
        const bidProduct = new ProductBidDetail(req.body);
        console.log('bid product');
        console.log(bidProduct);
        await bidProduct.save();
        res.status(201).json({bidProduct});
    } catch (err) {
        console.log(err);
        res.status(400).json({err: [{error: err.message}]});
    }
}
import fs from 'fs';
import { validationResult } from 'express-validator';

import Product from '../models/product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: "server experienced issues!"});
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
        res.status(400).json({err: err.message});
    }
}
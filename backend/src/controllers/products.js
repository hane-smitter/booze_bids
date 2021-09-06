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
    if(!req.file) {
        return res.status(400).json({ err: 'image file is missing!' });
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
        console.log(err);
        res.status(400).json({err: err.message});
    }
}
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: String, 
    brand: String, 
    cost: String, 
    store: String, 
    category: String, 
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Product = mongoose.model('Product', productSchema)

export default Product;
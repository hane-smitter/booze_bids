import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }, 
    brand: {
        type: String,
        trim: true
    },
    image: String, 
    cost: {
        type: Number,
        default: 0,
        validate(val) {
            if(val < 0)
            throw new Error('Negative cost is not accepted!');
        }
    }, 
    store: String, 
    category: String,
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema)

export default Product;
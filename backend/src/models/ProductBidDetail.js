import mongoose from 'mongoose';
import Product from './Product.js';

const ProductBidDetailSchema = mongoose.Schema({
    bidPrice: {
        type: Number,
        required: true
    },
    targetAmount: Number,
    slots: {
        type: Number,
        required: true
    },
    extraLots: Number,
    extraCost: Number,
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: Date.now
    }, 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Product'
    }
}, {timestamps: true});

ProductBidDetailSchema.pre('validate', async function(next) {
    const product = await Product.findById(this.product);
    if(!product) throw new Error('This product does not exist');
    if(this.targetAmount < product.cost) throw new Error("Target Amount is less than cost of Product");
    const slots = Math.ceil(product.cost / this.bidPrice);
    this.slots = slots;
    next();
});

const ProductBidDetail = mongoose.model('ProductBidDetail', ProductBidDetailSchema);

export default ProductBidDetail;
import mongoose from 'mongoose';

const ProductBidDetailSchema = mongoose.Schema({
    bidPrice: Number,
    targetAmount: Number,
    lots: Number,
    extraLots: Number,
    extraCost: Number,
    startTime: {
        type: Date,
        default: Date.now()
    },
    endTime: {
        type: Date,
        default: Date.now()
    }, 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
}, {timestamps: true});

const ProductBidDetail = mongoose.model('ProductBidDetail', ProductBidDetailSchema);

export default ProductBidDetail;
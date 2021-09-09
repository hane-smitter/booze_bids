import mongoose from 'mongoose';

const ProductBidDetailSchema = mongoose.Schema({
    bidPrice: Number,
    targetAmount: Number,
    startTime: {
        type: DateTime,
        default: new DateTime()
    },
    endTime: {
        type: DateTime,
        default: new DateTime()
    }, 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

const ProductBidDetail = mongoose.model('ProductBidDetail', ProductBidDetailSchema);

export default ProductBidDetail;
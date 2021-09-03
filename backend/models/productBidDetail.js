import mongoose from 'mongoose';

const productBidDetailSchema = mongoose.Schema({
    bidPrice: String, 
    targetAmount: String, 
    startTime: {
        type: DateTime,
        default: new DateTime()
    }, 
    endTime: {
        type: DateTime,
        default: new DateTime()
    }, 
    product: String, 
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const ProductBidDetail = mongoose.model('ProductBidDetail', productBidDetailSchema)

export default ProductBidDetail;
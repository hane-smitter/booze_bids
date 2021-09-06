import mongoose from 'mongoose';

const bidSchema = mongoose.Schema({
    product: String, 
    bidPrice: String, 
    user: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Bid = mongoose.model('Bid', bidSchema)

export default Bid;
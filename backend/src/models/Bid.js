import mongoose from 'mongoose';

const BidSchema = mongoose.Schema({
    product: String, 
    bidPrice: String, 
    user: String
}, {timestamps: true});

const Bid = mongoose.model('Bid', BidSchema)

export default Bid;
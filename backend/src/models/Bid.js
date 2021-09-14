import mongoose from 'mongoose';

const BidSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bidPrice: {
        required: true,
        type: Number
    },
    bidAmount: {
        required: true,
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

const Bid = mongoose.model('Bid', BidSchema)

export default Bid;
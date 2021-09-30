import mongoose from 'mongoose';

const BidSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    bidPrice: {
        required: true,
        type: Number
    },
    bidAmount: {
        type: [Number],
        required: true
    },
    bidAmountTotal: Number,
    bidsCount: {
        type: Number,
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { toJSON: {virtuals: true}, timestamps: true });

BidSchema.post('validate', function(bid, next) {
    let bidAmountArr = bid.bidAmount;
    bid.bidAmountTotal = bidAmountArr.reduce((prev, curr) => prev + curr);
    next();
});



const Bid = mongoose.model('Bid', BidSchema)

export default Bid;